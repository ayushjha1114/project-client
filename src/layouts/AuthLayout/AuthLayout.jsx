import React from 'react';
import PropTypes from 'prop-types';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Login from '../../pages/Login';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => {
  console.log(children);
  return (
    (children.props.match.path === '/login')
      ? (
        <>
          <Login {...rest}>
            {children}
          </Login>
          <Footer />
        </>
      )
      : (
        <>
          <AdminLogin {...rest}>
            {children}
          </AdminLogin>
          <Footer />
        </>
      )
  );
};

AuthLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
