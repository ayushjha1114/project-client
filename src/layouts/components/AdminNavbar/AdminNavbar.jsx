import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Badge, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp, Notifications } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { SnackbarConsumer } from '../../../contexts/SnackBarProvider/SnackBarProvider';
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

  handleLogout = (e, values) => {
    e.preventDefault();
    localStorage.clear();
    values.openSnack('Successfully logged out', 'success');
    const { history } = this.props;
    history.push('/adminLogin');
  }

  handleUsers = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${adminPath}/users`);
  }

  handleUserComplaints = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${adminPath}/usercomplaints`);
  }

  handleNotification = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${adminPath}/notification`);
  }

  render() {
    const { classes } = this.props;
    console.log('11111', this.props, this.state);
    const { notifyCount } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link component={RouterLink} underline="none" color="inherit" to={adminPath}>
              Admin Dashboard
              </Link>
            </Typography>
            <Button color="inherit" onClick={e => this.handleUsers(e)}>
            Users
            </Button>
            <Button color="inherit" onClick={e => this.handleUserComplaints(e)}>
            Complaints
            </Button>
            {
              <SnackbarConsumer>
                {value => (
                  <Button
                    color="inherit"
                    onClick={e => this.handleLogout(e, value)}
                  >
                      Logout
                    <ExitToApp />
                  </Button>
                )}
              </SnackbarConsumer>
            }
            <IconButton color="inherit">
              <Badge badgeContent={notifyCount} color="secondary" onClick={e => this.handleNotification(e)}>
                <Notifications />
              </Badge>
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
