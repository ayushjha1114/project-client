import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';
import { NoMatch } from '..';

function Admin(props) {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} {...props} component={TraineeList} />
        <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
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
