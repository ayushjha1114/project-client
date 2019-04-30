import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <>
    {
      (localStorage.getItem('token')) ? (
        <Route
          {...rest}
          render={matchProps => (
            <PrivateLayout>
              <Component {...matchProps} />
            </PrivateLayout>
          )}
        />
      )
        : <Redirect to="/login" />
    }
    {/* <Route
      {...rest}
      render={matchProps => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    /> */}

  </>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default PrivateRoute;
