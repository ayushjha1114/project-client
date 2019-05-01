import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Badge, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp, Notifications } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { callApi } from '../../../lib/utils/api';
import { adminPath } from '../../../configs/constants';

const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
  app: {
    backgroundColor: '#34C1A5',
  },
});

class AdminNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifyCount: 0,
    };
    this.notify();
  }

  notify = () => {
    callApi('get', {}, 'notify', {}).then((result) => {
      if (result.status) {
        this.setState({
          notifyCount: result.data.data.NumberOfOrders,
        });
      } else {
        console.log('notify', result.message);
      }
    });
  }

  handleLogout = () => {
    localStorage.clear();
  }

  render() {
    const { classes } = this.props;
    const { notifyCount } = this.state;
    console.log('inside admin nav');

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link component={RouterLink} underline="none" color="inherit" to={adminPath}>
              Admin Dashboard
              </Link>
            </Typography>
            <Link component={RouterLink} underline="none" color="inherit" to={`${adminPath}/users`}>
              <Button color="inherit">
            Users
              </Button>
            </Link>
            <Link component={RouterLink} underline="none" color="inherit" to={`${adminPath}/usercomplaints`}>
              <Button color="inherit">
            Complaints
              </Button>
            </Link>
            <Link component={RouterLink} underline="none" color="inherit" to="/adminLogin">
              <Button
                color="inherit"
                onClick={() => this.handleLogout()}
              >
                Logout
                <ExitToApp />
              </Button>
            </Link>
            <IconButton color="inherit">
              <Link component={RouterLink} underline="none" color="inherit" to={`${adminPath}/notification`}>
                <Badge badgeContent={notifyCount} color="secondary">
                  <Notifications />
                </Badge>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AdminNavBar.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,

};

export default withStyles(styles)(AdminNavBar);
