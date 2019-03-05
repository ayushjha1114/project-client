import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, FormHelperText, InputAdornment,
} from '@material-ui/core';
import {
  Person, Email,
} from '@material-ui/icons';
import * as yup from 'yup';
import trainee from '../../data/trainee';


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
  traineeId: PropTypes.string.isRequired,
};

// default values for props:
const defaultProps = {
  editOpen: false,
  classes: {},
};

class AddDialog extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    email: yup.string().email().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        email: '',
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
    if (!checkError && touched === 2) {
      result = true;
    } else if (checkError && touched !== 2) {
      result = false;
    }
    return result;
  }


  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { form } = this.state;
    onSubmit(form);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { editOpen, classes, traineeId } = this.props;
    let traineeName;
    let traineeEmail;
    trainee.forEach((train) => {
      if (traineeId === train.id) {
        traineeName = train.name;
        traineeEmail = train.email;
      }
    });
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={editOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
                  Edit trainee details
            </DialogContentText>
            <TextField
              fullWidth
              id="outlined-name"
              label="Name"
              defaultValue={traineeName}
              error={this.getError('name')}
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
              error={this.getError('password')}
              className={classes.textField}
              type="email"
              name="email"
              defaultValue={traineeEmail}
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
            {
              (this.buttonChecked()) ? (
                <Button onClick={this.handleSubmit} color="primary">
                Submit
                </Button>
              ) : (
                <Button onClick={this.handleSubmit} color="primary" disabled>
                Submit
                </Button>
              )
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;

export default withStyles(styles)(AddDialog);
