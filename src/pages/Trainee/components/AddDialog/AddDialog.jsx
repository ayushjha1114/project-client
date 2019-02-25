import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import {
  Person, Visibility, VisibilityOff, Email,
} from '@material-ui/icons';
import * as yup from 'yup';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 550,
  },
});

const propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  open: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit: PropTypes.func,
};

// default values for props:
const defaultProps = {
  open: false,
  onSubmit: () => {},
};

class AddDialog extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    email: yup.string().email().required(),
    password: yup.string().required().min('Must contain 8 characters'),
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      form: {
        name: '',
        password: '',
        email: '',
      },
      error: {
        name: '',
        password: '',
        email: '',
      },
      isTouched: {
        name: false,
        password: false,
        email: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched, form } = this.state;

    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    });
  };

  handleOnBlur = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const { name, email, password } = form;
    this.schema.validate({ name, email, password }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      console.log('error inside catch', err);
      err.inner.forEach((er) => {
        if (er.path === field) {
          this.setState({
            error: { ...error, [field]: er.message },
            isTouched: { ...isTouched, [field]: true },
          });
        }
      });
      if (!err.inner.some(er => er.path === field)) {
        this.setState({
          error: { ...error, [field]: '' },
        });
      }
    });
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { classes } = this.props;
    const { name, showPassword } = this.state;
    return (
      <>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={name}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('name')}
            onBlur={this.handleOnBlur('name')}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
            }}
          />
          <FormHelperText id="component-error-text">Error</FormHelperText>
          <TextField
            id="outlined-email-input"
            label="Email"
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

          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              label="Password"
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input1"
              label="Confirm Password"
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
          </Grid>
        </form>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;

export default withStyles(styles)(AddDialog);
