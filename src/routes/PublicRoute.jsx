import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from '../layouts';

const PublicRoute = ({ component: Component, ...rest }) => (
  <>
    {/*     {
      (localStorage.getItem('token')) ? (
        <Route
          {...rest}
          render={matchProps => (
            <AuthLayout>
              <Component {...matchProps} />
            </AuthLayout>
          )}
        />
      )
        : <Redirect to="/" />
    } */}
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />

  </>
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default PublicRoute;
