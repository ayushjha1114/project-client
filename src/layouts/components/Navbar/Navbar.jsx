import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Link component={RouterLink} underline="none" color="inherit" to="/trainee">
            <Button color="inherit">
              TRAINEE
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/text-field-demo">
            <Button color="inherit">
            TEXTFIELD DEMO
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/input-demo">
            <Button color="inherit">
            INPUT DEMO
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/children-demo">
            <Button color="inherit">
            CHILDREN DEMO
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/children-demo">
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
