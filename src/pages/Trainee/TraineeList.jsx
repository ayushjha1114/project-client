import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { AddDialog } from '.';
import trainee from './data/trainee';
import { column } from '../../configs/constants';
import TraineeTable from '../../components/TraineeTable/TraineeTable';
import { EditDialog, RemoveDialog } from './components';


export default class TraineeList extends React.Component {
  state = {
    id: '',
    editDialog: false,
    deleteDialog: false,
    open: false,
    orderBy: '',
    order: 'asc',
    page: 0,
  };

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

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

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
      open, order, orderBy, page, editDialog, id, deleteDialog,
    } = this.state;
    return (
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

        <TraineeTable
          data={trainee}
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
          rowsPerPage={5}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
