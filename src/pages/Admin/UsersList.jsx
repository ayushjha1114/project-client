import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { AddDialog } from '.';
import { columnArr } from '../../configs/constants';
import TraineeTable from '../../components/TraineeTable/TraineeTable';
import { EditDialog, RemoveDialog } from './components';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';


export default class UsersList extends React.Component {
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
    callApi('get', {}, 'user', { skip: skipPage, limit: limitpage }).then((result) => {
      console.log('@@@', result);
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.totalNumberOfDocs,
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

  handleChangePage = (event, page) => {
    this.setState({
      page,
      loader: true,
    });
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'user', { skip: skipPage, limit: limitpage }).then((result) => {
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.totalNumberOfDocs,
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
    const { errorAlert } = this.state;
    const { openSnack } = value;
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

  commonCallApi = () => {
    const { page } = this.state;
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'user', { skip: skipPage, limit: limitpage }).then((result) => {
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.totalNumberOfDocs,
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

  handleSubmit = (form) => {
    this.setState({ open: false });
    this.commonCallApi();
    console.log(form);
  };

  handleEditSubmit = (form) => {
    this.setState({ editDialog: false, id: '' });
    this.commonCallApi();
    console.log('Edited', form);
  };

  handleRemoveSubmit = (form) => {
    this.setState({ deleteDialog: false });
    this.commonCallApi();
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
    history.push(`/admin/users/${id}`);
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
            Add User
                </Button>
              </div>
              <AddDialog
                open={open}
                {...this.props}
                onClose={this.handleClose}
                onSubmit={this.handleSubmit}
              />
            </div>
            {
              (id) ? (
                <>
                  <EditDialog
                    traineeData={id}
                    {...this.props}
                    editOpen={editDialog}
                    onClose={this.handleEditClose}
                    onSubmit={this.handleEditSubmit}
                  />
                  <RemoveDialog
                    traineeData={id}
                    {...this.props}
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
                  columns={columnArr}
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
                  count={dataLength}
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

UsersList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
