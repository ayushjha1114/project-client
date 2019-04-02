import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { AddDialog } from '.';
import trainee from './data/trainee';
import { column } from '../../configs/constants';
import TraineeTable from '../../components/TraineeTable/TraineeTable';


export default class TraineeList extends React.Component {
  state = {
    open: false,
    orderBy: '',
    order: 'asc',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value) => {
    this.setState({ open: value });
  };

  handleSubmit = (form) => {
    this.setState({ open: false });
    console.log(form);
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

  render() {
    const { open, order, orderBy } = this.state;
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
        <TraineeTable data={trainee} columns={column} id="id" orderBy={orderBy} order={order} onSort={this.handleSort} onSelect={this.handleSelect} />
      </>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
