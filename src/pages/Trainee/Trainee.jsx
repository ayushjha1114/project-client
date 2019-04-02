import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';
import { NoMatch } from '..';
// import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';
// import EnhancedTable from '../../components/HOC';


function Trainee(props) {
  const { match } = props;

  return (
    <>
      {/* <SnackbarConsumer> */}
      <Switch>
        <Route exact path={`${match.path}`} component={(TraineeList)} />
        <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
        <Route path={`${match.path}/`} component={NoMatch} />
      </Switch>
      {/* </SnackbarConsumer> */}
    </>
  );
}

Trainee.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Trainee;
