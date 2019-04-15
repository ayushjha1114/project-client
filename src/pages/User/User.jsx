import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TraineeDetail from './TraineeDetail';
import TraineeList from './Quantity';
import { NoMatch } from '..';

function Trainee(props) {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} {...props} component={Quantity} />
        <Route exact path={`${match.path}/orders`} {...props} component={Orders} />
        <Route exact path={`${match.path}/complaint`} {...props} component={Complaint} />
        <Route exact path={`${match.path}/profile`} {...props} component={Profile} />
        {/* <Route exact path={`${match.path}/complaint`} {...props} component={TraineeList} /> */}
        <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
        <Route path={`${match.path}/`} component={NoMatch} />
      </Switch>
    </>
  );
}

Trainee.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Trainee;
