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
    const { history } = this.props;
    history.push('/login');
  }

  handleProfile = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${userPath}/profile`);
  }

  handleComplaint = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${userPath}/complaint`);
  }

  handleOrders = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${userPath}/orders`);
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
            <Button color="inherit" onClick={e => this.handleProfile(e)}>
              Profile
            </Button>
            <Button color="inherit" onClick={e => this.handleComplaint(e)}>
            Complaint
            </Button>
            {/* <Link component={RouterLink} underline="none" color="inherit" to={`${userPath}/orders`}> */}
            <Button color="inherit" onClick={e => this.handleOrders(e)}>
            Orders
            </Button>
            {/* </Link> */}
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
  classes: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(UserNavBar);
