import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { AddDialog } from '.';
import { column } from '../../configs/constants';
import TraineeTable from '../../components/TraineeTable/TraineeTable';
import { EditDialog, RemoveDialog } from './components';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';


export default class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      editDialog: false,
      deleteDialog: false,
      open: false,
      orderBy: '',
      order: 'asc',
      page: 0,
      item: {},
      loader: true,
      dataLength: 0,
      errorAlert: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { page } = this.state;
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'traine', { skip: skipPage, limit: limitpage }).then((result) => {
      console.log('30-----line-----', result.message);
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.count,
          errorAlert: '',
        });
      } else {
        console.log('46-------------');
        this.setState({
          loader: false,
          errorAlert: result.message,
        });
      }
    });
  }

  handleChangePage = (event, page) => {
    this.setState({
      page,
      loader: true,
    });
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'trainee', { skip: skipPage, limit: limitpage }).then((result) => {
      console.log('AJKNAKNSDDN', result.data.data.count);
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.count,
          errorAlert: '',
        });
      } else {
        this.setState({
          loader: false,
          errorAlert: result.message,
        });
      }
    });
  }

  showErrorAlert = (value) => {
    console.log('79-------------', value);
    const { errorAlert } = this.state;
    const { openSnack } = value;
    console.log('----------82--------', errorAlert);
    if (errorAlert) {
      openSnack(errorAlert, 'error');
      this.setState({
        errorAlert: '',
      });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value) => {
    this.setState({ open: value });
  };

  handleEditClose = (value) => {
    this.setState({ editDialog: value, id: '' });
  };

  handleRemoveClose = (value) => {
    this.setState({ deleteDialog: value });
  };

  handleSubmit = (form) => {
    this.setState({ open: false });
    console.log(form);
  };

  handleEditSubmit = (form) => {
    this.setState({ editDialog: false, id: '' });
    console.log('Edited', form);
  };

  handleRemoveSubmit = (form) => {
    this.setState({ deleteDialog: false });
    console.log('Remove', form);
  };

  handleSort = (property) => {
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      this.setState({ order: 'asc', orderBy: property });
    } else {
      this.setState({ order: 'desc', orderBy: property });
    }
  };

  handleSelect = (id) => {
    const { history } = this.props;
    history.push(`/trainee/${id}`);
  };

  handlerEditDialogOpen = (row) => {
    this.setState({
      id: row,
      editDialog: true,
    });
  };

  handlerRemoveDialogOpen = (row) => {
    this.setState({
      id: row,
      deleteDialog: true,
    });
  };

  render() {
    const {
      open, order, orderBy, page, editDialog, id,
      deleteDialog, item, loader, dataLength, errorAlert,
    } = this.state;
    console.log('120===========', item);
    return (
      <SnackbarConsumer>
        {value => (
          <>
            <div>
              <div style={{ margin: 10, textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClickOpen}
                >
            Add Trainee
                </Button>
              </div>
              <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
            </div>
            {
              (id) ? (
                <>
                  <EditDialog
                    traineeId={id}
                    editOpen={editDialog}
                    onClose={this.handleEditClose}
                    onSubmit={this.handleEditSubmit}
                  />
                  <RemoveDialog
                    traineeId={id}
                    removeOpen={deleteDialog}
                    onClose={this.handleRemoveClose}
                    onSubmit={this.handleRemoveSubmit}
                  />
                </>
              ) : ''
            }
            {(errorAlert) ? (this.showErrorAlert(value))
              : (
                <TraineeTable
                  result={item}
                  columns={column}
                  id="id"
                  actions={[
                    {
                      icon: <EditIcon />,
                      handler: this.handlerEditDialogOpen,
                    },
                    {
                      icon: <DeleteIcon />,
                      handler: this.handlerRemoveDialogOpen,
                    },
                  ]}
                  orderBy={orderBy}
                  order={order}
                  onSort={this.handleSort}
                  onSelect={this.handleSelect}
                  count={100}
                  page={page}
                  rowsPerPage={10}
                  onChangePage={this.handleChangePage}
                  loader={loader}
                  dataLength={dataLength}
                />
              )}
          </>
        )}
      </SnackbarConsumer>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
