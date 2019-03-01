import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AddDialog } from '.';
import trainee from './data/trainee';

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
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
            style={{ margin: 10 }}
          >
            Add Trainee
          </Button>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        </div>
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
