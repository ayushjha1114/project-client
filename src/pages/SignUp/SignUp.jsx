import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, CircularProgress, TextField, Grid,
  FormHelperText, IconButton, InputAdornment, Paper, Typography,
} from '@material-ui/core';
import {
  Visibility, VisibilityOff, Email, Person, PersonAdd,
} from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import * as yup from 'yup';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  error: {
    color: 'red',
  },
});

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

class SignUp extends React.Component {
  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loader: false,
      snackCheck: false,
      form: {
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
      },
      error: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
      isTouched: {
        name: false,
        password: false,
        confirmPassword: false,
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
  if (error.name === '' && error.email === '' && error.password === '' && error.confirmPassword === '') {
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
  if (!checkError && touched === 4) {
    result = true;
  } else if (checkError && touched !== 4) {
    result = false;
  }
  return result;
}

handleClickShowPassword = () => {
  const { showPassword } = this.state;
  this.setState({ showPassword: !showPassword });
};

handleSubmit = async (e, values) => {
  e.preventDefault();
  const { form } = this.state;
  this.setState({
    loader: true,
  });
  const { confirmPassword, ...rest } = form;
  const result = await callApi('post', rest, 'user');
  // eslint-disable-next-line react/prop-types
  const { children } = this.props;
  if (result.status) {
    this.setState({
      loader: false,
    });
    window.localStorage.setItem('token', result.data.data);
    children.props.history.push('/');
  } else {
    values.openSnack('Not Valid', 'error');
    this.setState({
      snackCheck: true,
      loader: false,
    });
  }
}


render() {
  const { classes, ...rest } = this.props;
  const { showPassword, loader, snackCheck } = this.state;
  return (
    <>
      <main {...rest} className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
          Log in
          </Typography>
          <form className={classes.form}>
            <TextField
              fullWidth
              id="outlined-name"
              label="Name"
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
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  error={this.showBooleanError('password')}
                  className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('password')}
                  onBlur={this.handleOnBlur('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText id="component-error-text3" className={classes.error}>
                  {this.getError('password')}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input1"
                  label="Confirm Password"
                  error={this.showBooleanError('confirmPassword')}
                  className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={this.handleOnBlur('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText id="component-error-text4" className={classes.error}>
                  {this.getError('confirmPassword')}
                </FormHelperText>
              </Grid>
            </Grid>
            {
              <SnackbarConsumer>
                {value => (
                  <Button
                    type="submit"
                    fullWidth
                    disabled={(!this.buttonChecked() || loader)}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => {
                      this.handleSubmit(e, value);
                    }}
                  >
                    {
                      (!loader || snackCheck)
                        ? <b>SIGN IN</b>
                        : <CircularProgress size={24} thickness={4} />
                    }
                  </Button>
                )}
              </SnackbarConsumer>
            }

          </form>
        </Paper>
      </main>
    </>
  );
}
}

SignUp.propTypes = propTypes;

export default withStyles(styles)(SignUp);
