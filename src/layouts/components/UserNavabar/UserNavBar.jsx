import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Badge, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp, Notifications } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { userPath } from '../../../configs/constants';
import { SnackbarConsumer } from '../../../contexts/SnackBarProvider/SnackBarProvider';


const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
});

function AdminDashboard(props) {
  const { classes } = props;

  function handleLogout(e, values) {
    e.preventDefault();
    const { history } = props;
    history.push('/login');
    localStorage.removeItem('token');
    values.openSnack('Successfully logged out', 'success');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link component={RouterLink} underline="none" color="inherit" to={userPath}>
            Welcome, Ayush
            </Link>
          </Typography>
          <Link component={RouterLink} underline="none" color="inherit" to={`${userPath}/profile`}>
            <Button color="inherit">
              Profile
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to={`${userPath}/complaint`}>
            <Button color="inherit">
            Complaint
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to={`${userPath}/orders`}>
            <Button color="inherit">
            Orders
            </Button>
          </Link>
          {
            <SnackbarConsumer>
              {value => (
                <Link component={RouterLink} underline="none" color="inherit" to="/login">
                  <Button
                    color="inherit"
                    onClick={e => handleLogout(e, value)}
                  >
                        Logout
                    <ExitToApp />
                  </Button>
                </Link>
              )}
            </SnackbarConsumer>
          }
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

AdminDashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);
