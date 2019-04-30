import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import OrderDetail from './OrderDetail';
import Quantity from './Quantity';
import Orders from './Orders';
import Profile from './Profile';
import Complaint from './Complaint';
import OrderPlaced from './OrderPlaced';
import { NoMatch } from '..';

function User(props) {
  const { match } = props;
  console.log('sdfsd', match);

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} {...props} component={Quantity} />
        <Route exact path={`${match.path}/orders`} {...props} component={Orders} />
        <Route exact path={`${match.path}/orders/placed`} {...props} component={OrderPlaced} />
        <Route exact path="/user/complaint" {...props} component={Complaint} />
        <Route exact path={`${match.path}/profile`} {...props} component={Profile} />
        {/* <Route exact path={`${match.path}/complaint`} {...props} component={UserList} /> */}
        <Route exact path={`${match.path}/orders/:id`} {...props} component={OrderDetail} />
        <Route path={`${match.path}/`} component={NoMatch} />
      </Switch>
    </>
  );
}

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default User;
