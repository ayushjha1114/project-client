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
import { callApi } from '../../../lib/utils/api';


const styles = ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
  app: {
    backgroundColor: 'gray',
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
      result.data.data.documents.forEach((element) => {
        // eslint-disable-next-line no-underscore-dangle
        if (email === element.email) {
          this.setState({
            name: element.name,
          });
        }
      });
    });
  }

  handleLogout = () => {
    localStorage.clear();
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    const { name } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
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
            <Link component={RouterLink} underline="none" color="inherit" to="/user/complaint">
              <Button color="inherit">
            Complaint
              </Button>
            </Link>
            <Link component={RouterLink} underline="none" color="inherit" to={`${userPath}/orders`}>
              <Button color="inherit">
                Orders
              </Button>
            </Link>
            <Link component={RouterLink} underline="none" color="inherit" to="/login">
              <Button
                color="inherit"
                onClick={() => this.handleLogout()}
              >
                        Logout
                <ExitToApp />
              </Button>
            </Link>
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
};

export default withStyles(styles)(UserNavBar);
