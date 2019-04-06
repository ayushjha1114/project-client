import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Badge, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp, Notifications } from '@material-ui/icons';
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

function AdminDashboard(props) {
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
            ADMIN DASHBOARD
          </Typography>
          <Link component={RouterLink} underline="none" color="inherit" to="/trainee">
            <Button color="inherit">
              EMPLOYEES
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/text-field-demo">
            <Button color="inherit">
            USERS
            </Button>
          </Link>
          <Link component={RouterLink} underline="none" color="inherit" to="/children-demo">
            <Button color="inherit">
            COMPLAINT
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
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
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
