import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserLayout } from '../layouts';

const UserRoute = ({ component: Component, ...rest }) => (
  <>
    {/* {
      (localStorage.getItem('token')) ? (
        <Route
          {...rest}
          render={matchProps => (
            <UserLayout>
              <Component {...matchProps} />
            </UserLayout>
          )}
        />
      )
        : <Redirect to="/login" />
    } */}
    <Route
      {...rest}
      render={matchProps => (
        <UserLayout>
        <Component {...matchProps} />
      </UserLayout>
      )}
    />

  </>
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default UserRoute;
