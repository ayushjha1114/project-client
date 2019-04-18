import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Toolbar, Typography,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { userPath } from '../../../configs/constants';
import { SnackbarConsumer } from '../../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../../lib/utils/api';


const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
});

class UserNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.getEmail();
  }

  getEmail = () => {
    const email = localStorage.getItem('email');
    callApi('get', {}, 'user', {}).then((result) => {
      result.data.data.records.forEach((element) => {
        // eslint-disable-next-line no-underscore-dangle
        if (email === element.email) {
          this.setState({
            name: element.name,
          });
        }
      });
    });
  }

  handleLogout = (e, values) => {
    e.preventDefault();
    localStorage.clear();
    values.openSnack('Successfully logged out', 'success');
  }

  render() {
    const { classes } = this.props;
    const { name } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link component={RouterLink} underline="none" color="inherit" to={userPath}>
                {`Welcome, ${name}`}
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
                      onClick={e => this.handleLogout(e, value)}
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
}

UserNavBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserNavBar);
