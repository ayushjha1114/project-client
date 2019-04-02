import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import moment from 'moment';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

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

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  dateMatch = () => {
    const { traineeId } = this.props;
    const date = moment(traineeId.createdAt).format('ll');
    if (moment(date).isSame('Feb 14, 2019') || moment(date).isAfter('Feb 14, 2019')) {
      return true;
    }
    return false;
  }

  render() {
    const { removeOpen, onSubmit, traineeId } = this.props;
    /*     const date = moment(traineeId.createdAt).format('ll');
    console.log('@@@@', moment(date).isSame('Feb 14, 2019'));
    console.log('!!!!', moment(date).isAfter('Feb 14, 2019')); */

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
            {
              <SnackbarConsumer>
                {({ openSnack }) => (
                  <Button
                    onClick={() => {
                      onSubmit(traineeId);
                      if (this.dateMatch()) {
                        openSnack('Trainee deleted!', 'success');
                      } else {
                        openSnack('Trainee cannot be deleted!', 'error');
                      }
                    }}
                    color="primary"
                  >
                    Delete
                  </Button>
                )}
              </SnackbarConsumer>
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;

export default AddDialog;
