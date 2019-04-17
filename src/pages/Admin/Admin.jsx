import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import UserDetail from './UserDetail';
import UsersList from './UsersList';
import Notification from './Notification';
import NotifyDetail from './NotifyDetail';
import UserComplaints from './UserComplaints';
import { NoMatch } from '..';

function Admin(props) {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} {...props} component={UsersList} />
        <Route exact path={`${match.path}/users`} {...props} component={UsersList} />
        <Route exact path={`${match.path}/usercomplaints`} {...props} component={UserComplaints} />
        <Route exact path={`${match.path}/notification`} {...props} component={Notification} />
        <Route exact path={`${match.path}/notification/:id`} component={NotifyDetail} />
        <Route exact path={`${match.path}/users/:id`} component={UserDetail} />
        <Route path={`${match.path}/`} component={NoMatch} />
      </Switch>
    </>
  );
}

Admin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Admin;
