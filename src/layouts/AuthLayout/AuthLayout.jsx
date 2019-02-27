import React from 'react';
import PropTypes from 'prop-types';
import Login from '../../pages/Login';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => (
  <>
    <Login {...rest}>
      {children}
    </Login>
    <Footer />
  </>
);

AuthLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AuthLayout;
