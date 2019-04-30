import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CircularProgress,
  TextField, FormHelperText, Paper,
} from '@material-ui/core';
import * as yup from 'yup';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

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
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
};

// default values for props:
const defaultProps = {
  classes: {},
};

class Complaint extends React.Component {
  schema = yup.object().shape({
    firstName: yup
      .string()
      .required(),
    lastName: yup
      .string()
      .required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
    plastic: yup.number().required(),
    metal: yup.number().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      snackCheck: false,
      addressform: {
        complaint: '',
        email: '',

      },
      error: {
        complaint: '',
        email: '',

      },
      isTouched: {
        complaint: false,
        email: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched, addressform } = this.state;

    this.setState({
      addressform: { ...addressform, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    }, this.handleValidate(field));
  };

  handleValidate = field => () => {
    const {
      addressform, error, isTouched,
    } = this.state;
    const {
      complaint, email,
    } = addressform;
    this.schema.validate({
      complaint, email,
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
      addressform, error, isTouched,
    } = this.state;
    const {
      complaint, email,
    } = addressform;
    this.schema.validate({
      complaint, email,
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
    if (error.complaint === '' && error.email === '') {
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
    if (!checkError && touched === 2) {
      result = true;
    } else if (checkError && touched !== 2) {
      result = false;
    }
    return result;
  }

  handleSubmit = async (e, values) => {
    e.preventDefault();
    let id = '';
    const { addressform } = this.state;
    this.setState({
      loader: true,
    });
    const getID = await callApi('get', {}, 'user', {});
    if (getID.status) {
      getID.data.data.records.forEach((element) => {
        if (addressform.email === element.email) {
          // eslint-disable-next-line no-underscore-dangle
          id = element._id;
        }
      });
      const result = await callApi('put', { dataToUpdate: addressform, id }, 'order');
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      console.log('inside complaint ', this.props);
      if (result.status) {
        this.setState({
          loader: false,
        });
        values.openSnack(result.data.message, 'success');
        history.push('/user');
      } else {
        values.openSnack('Not Authorized', 'error');
        this.setState({
          snackCheck: true,
          loader: false,
        });
      }
    } else {
      console.log('Unable to get ID');
    }
  };

  render() {
    const { classes } = this.props;
    const { loader, snackCheck } = this.state;
    console.log('^^^^^^')

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Type your Complaint
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
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
                />
                <FormHelperText id="component-email-text2" className={classes.error}>
                  {this.getError('email')}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Complaint"
                  multiline
                  type="text"
                  name="address"
                  rows="4"
                  defaultValue="type here"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('complaint')}
                  onBlur={this.handleOnBlur('complaint')}
                />
                <FormHelperText id="component-complaint-text2" className={classes.error}>
                  {this.getError('complaint')}
                </FormHelperText>
              </Grid>
              <SnackbarConsumer>
                {value => (
                  <Button
                    color="primary"
                    disabled={(!this.buttonChecked() || loader)}
                    onClick={(e) => {
                      this.handleSubmit(e, value);
                    }}
                  >
                    {
                      (!loader || snackCheck)
                        ? <b>Complaint</b>
                        : <CircularProgress size={24} thickness={4} />
                    }
                  </Button>
                )}
              </SnackbarConsumer>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}


Complaint.propTypes = propTypes;
Complaint.defaultProps = defaultProps;

export default withStyles(styles)(Complaint);
