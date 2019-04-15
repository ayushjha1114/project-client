import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp, PersonAdd } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
});

function NavBar(props) {
  const { classes } = props;

  function handleLogout() {
    console.log('dd', props);
    localStorage.removeItem('token');
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link component={RouterLink} underline="none" color="inherit" to="/trainee">
           Welcome
            </Link>
          </Typography>
          <Link component={RouterLink} underline="none" color="inherit" to="/trainee">
            <Button color="inherit">
              About Us
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/contactUs">
            <Button color="inherit">
            Contact Us
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/signup">
            <Button color="inherit" onClick={() => handleSignIn()}>
            Sign Up
            <PersonAdd />
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/logout">
            <Button
              color="inherit"
              onClick={() => handleLogout()}
            >
          LOGOUT
              <ExitToApp />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
