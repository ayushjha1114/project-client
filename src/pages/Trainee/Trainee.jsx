import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddDialog } from '.';

export default class Trainee extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
          >
            Add Trainee
          </Button>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  Enter your trainee details
              </DialogContentText>
              <AddDialog />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}
