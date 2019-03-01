import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AddDialog } from '.';
import trainee from './data/trainee';
import { column } from '../../configs/constants';
import TraineeTable from '../../components/TraineeTable/TraineeTable';

export default class Trainee extends React.Component {
  state = {
    open: false,
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

  render() {
    const { open } = this.state;
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
        <TraineeTable data={trainee} columns={column} id="id" />
        <ul>
          {
            trainee.map(train => (
              <li key={train.id}>
                <Link to={`/trainee/${train.id}`}>{train.name}</Link>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}
