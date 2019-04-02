import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const propTypes = {
  removeOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  traineeId: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

// default values for props:
const defaultProps = {
  removeOpen: false,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = () => {
    const { onSubmit, traineeId } = this.props;
    // const { form } = this.state;
    /*     let data;
    trainee.forEach((train) => {
      if (traineeId === train.id) {
        data = train;
      }
    }); */

    onSubmit(traineeId);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { removeOpen } = this.props;
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={removeOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
                  Do you want to remove trainee details?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;

export default AddDialog;
