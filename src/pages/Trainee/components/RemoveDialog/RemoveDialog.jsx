import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../../../lib/utils/api';

const propTypes = {
  removeOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  traineeData: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

// default values for props:
const defaultProps = {
  removeOpen: false,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      snackCheck: false,
    };
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  /*   dateMatch = () => {
    const { traineeData } = this.props;
    const date = moment(traineeData.createdAt).format('ll');
    if (moment(date).isSame('Feb 14, 2019') || moment(date).isAfter('Feb 14, 2019')) {
      return true;
    }
    return false;
  } */

  handleSubmit = (e, value) => {
    e.preventDefault();
    this.setState({
      loader: true,
    });
    // eslint-disable-next-line react/prop-types
    const { history, traineeData } = this.props;
    callApi('DELETE', {}, `trainee/${traineeData.originalId}`, {}).then((result) => {
      if (result.status) {
        this.setState({
          loader: false,
        });
        value.openSnack('Trainee deleted!', 'success');
        history.push('/trainee');
      } else {
        value.openSnack(result.message, 'error');
        this.setState({
          snackCheck: true,
          loader: false,
        });
      }
    });
    const { onSubmit } = this.props;
    onSubmit(traineeData);
  };

  render() {
    const { removeOpen } = this.props;
    const { loader, snackCheck } = this.state;
    console.log('---74---- inisde remove', this.state);
    /*     const date = moment(traineeData.createdAt).format('ll');
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
                {value => (
                  <Button
                    disabled={loader}
                    onClick={(e) => {
                      this.handleSubmit(e, value);
                    }}
                    color="primary"
                  >
                    {
                      (!loader || snackCheck)
                        ? <b>Delete</b>
                        : <CircularProgress size={24} thickness={4} />
                    }
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
