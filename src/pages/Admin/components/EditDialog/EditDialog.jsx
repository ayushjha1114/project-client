import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, FormHelperText, InputAdornment,
} from '@material-ui/core';
import {
  Person, Email,
} from '@material-ui/icons';
import * as yup from 'yup';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../../../lib/utils/api';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: 'red',
    margin: 10,
  },
});

const propTypes = {
  editOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  traineeData: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

// default values for props:
const defaultProps = {
  editOpen: false,
  classes: {},
};

class EditDialog extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    email: yup.string().email().required(),
  });

  constructor(props) {
    super(props);
    const { traineeData } = this.props;
    const { name, email } = traineeData;
    this.state = {
      loader: false,
      snackCheck: false,
      form: {
        name,
        email,
      },
      error: {
        name: '',
        email: '',
      },
      isTouched: {
        name: false,
        email: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched, form } = this.state;

    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    }, this.handleValidate(field));
  };

  handleValidate = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      name, email, password, confirmPassword,
    } = form;
    this.schema.validate({
      name, email, password, confirmPassword,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      if (!err.inner.some(er => er.path === field)) {
        this.setState({
          error: { ...error, [field]: '' },
          isTouched: { ...isTouched, [field]: true },
        });
      }
    });
  }

  handleOnBlur = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      name, email, password, confirmPassword,
    } = form;
    this.schema.validate({
      name, email, password, confirmPassword,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      err.inner.forEach((er) => {
        if (er.path === field) {
          this.setState({
            error: { ...error, [field]: er.message },
            isTouched: { ...isTouched, [field]: true },
          });
        }
      });
    });
  }

  hasError = () => {
    const { error } = this.state;
    if (error.name === '' && error.email === '') {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const { isTouched, error } = this.state;
    let result = '';
    if (isTouched[field] === true) {
      result = error[field];
    }
    return result;
  }

  showBooleanError = (field) => {
    const { isTouched } = this.state;
    if (isTouched[field] === true) {
      return true;
    }
    return false;
  }

  buttonChecked = () => {
    const { isTouched } = this.state;
    let touched = 0;
    let result = false;
    const checkError = this.hasError();
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (!checkError && (touched === 2 || touched === 1)) {
      result = true;
    } else if (checkError && touched !== 2) {
      result = false;
    }
    return result;
  }


  handleSubmit = (e, value) => {
    e.preventDefault();
    const { form } = this.state;
    const { name, email } = form;
    this.setState({
      loader: true,
    });
    // eslint-disable-next-line react/prop-types
    const { onSubmit, traineeData } = this.props;
    console.log('%%%', traineeData);
    callApi(
      'PUT',
      {
        dataToUpdate: { name, email, password: '' }, id: traineeData.originalID,
      },
      'user',
      {},
    ).then((result) => {
      if (result.status) {
        this.setState({
          loader: false,
        });
        value.openSnack('User edited!', 'success');
        onSubmit(form);
      } else {
        value.openSnack(result.message, 'error');
        this.setState({
          snackCheck: true,
          loader: false,
        });
      }
    });
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { editOpen, classes } = this.props;
    const { form, loader, snackCheck } = this.state;
    const { name, email } = form;
    /*     let traineeName;
    let traineeEmail;
    trainee.forEach((train) => {
      if (traineeId === train.id) {
        traineeName = train.name;
        traineeEmail = train.email;
      }
    }); */
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={editOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>
                  Edit user details
            </DialogContentText>
            <TextField
              fullWidth
              id="outlined-name"
              label="Name"
              value={name}
              error={this.showBooleanError('name')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('name')}
              onBlur={this.handleOnBlur('name')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
              }}
            />
            <FormHelperText id="component-error-text" className={classes.error}>
              {this.getError('name')}
            </FormHelperText>
            <TextField
              fullWidth
              id="outlined-email-input"
              label="Email"
              error={this.showBooleanError('email')}
              className={classes.textField}
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('email')}
              onBlur={this.handleOnBlur('email')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
              }}
            />
            <FormHelperText id="component-error-text2" className={classes.error}>
              {this.getError('email')}
            </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <SnackbarConsumer>
              {value => (
                <Button
                  type="submit"
                  disabled={(!this.buttonChecked() || loader)}
                  color="primary"
                  onClick={(e) => {
                    this.handleSubmit(e, value);
                  }}
                >
                  {
                    (!loader || snackCheck)
                      ? <b>Submit</b>
                      : <CircularProgress size={24} thickness={4} />
                  }
                </Button>
              )}
            </SnackbarConsumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;

export default withStyles(styles)(EditDialog);
