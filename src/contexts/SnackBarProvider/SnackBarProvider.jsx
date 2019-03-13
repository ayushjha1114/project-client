import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const SnackBarContext = React.createContext(() => console.log('SnackBar triggered'));

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  icon: {
    fontSize: 20,
  },
});

class SnackbarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      status: '',
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  openSnackBar = (message, status) => {
    this.setState({
      message,
      open: true,
      status,
    });
  }

  closeSnackbar = () => {
    this.setState({
      message: '',
      open: false,
      status: '',
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes, children } = this.props;
    const { open, message, status } = this.state;
    const Icon = variantIcon[status];
    return (
      <>
        <SnackBarContext.Provider
          value={{
            openSnack: this.openSnackBar,
            closeSnack: this.closeSnackbar,
          }}
        >
          {children}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
          >
            <SnackbarContent
              className={classes[status]}
              aria-describedby="client-snackbar"
              message={(
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={classes.iconVariant} />
                  {message}
                </span>
              )}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
        </SnackBarContext.Provider>
      </>
    );
  }
}

SnackbarProvider.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(SnackbarProvider);

export const SnackbarConsumer = SnackBarContext.Consumer;
