import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Toolbar, Typography,
} from '@material-ui/core';
import { Lock, Person } from '@material-ui/icons';
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link component={RouterLink} underline="none" color="inherit" to="/aboutUs">
              Welcome
            </Link>
          </Typography>
          <Link component={RouterLink} underline="none" color="inherit" to="/aboutUs">
            <Button color="inherit">
              About Us
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/contactUs">
            <Button color="inherit">
            Contact Us
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/signUp">
            <Button color="inherit">
                Sign Up
              <Person />
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/login">
            <Button
              color="inherit"
            >
                        Login
              <Lock />
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
