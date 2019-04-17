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
import { callApi } from '../../lib/utils/api';


const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
});

class AdminDashboard extends React.Component {
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
    const { history } = this.props;
    history.push('/adminLogin');
    localStorage.removeItem('token');
    values.openSnack('Successfully logged out', 'success');
  }

  render() {
    const { classes } = this.props;
    const { notifyCount } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link component={RouterLink} underline="none" color="inherit" to="/admin">
              Admin Dashboard
              </Link>
            </Typography>
            <Link component={RouterLink} underline="none" color="inherit" to="/users">
              <Button color="inherit">
              Users
              </Button>
            </Link>
            <Link component={RouterLink} underline="none" color="inherit" to="/usercomplaints">
              <Button color="inherit">
              Complaints
              </Button>
            </Link>
            {
              <SnackbarConsumer>
                {value => (
                  <Link component={RouterLink} underline="none" color="inherit" to="/adminLogin">
                    <Button
                      color="inherit"
                      onClick={e => this.handleLogout(e, value)}
                    >
                        Logout
                      <ExitToApp />
                    </Button>
                  </Link>
                )}
              </SnackbarConsumer>
            }
            <Link component={RouterLink} underline="none" color="inherit" to="/notification">
              <IconButton color="inherit">
                <Badge badgeContent={notifyCount} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);
