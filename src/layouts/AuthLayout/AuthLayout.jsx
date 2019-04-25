import React from 'react';
import PropTypes from 'prop-types';
import AdminLogin from '../../pages/Admin/AdminLogin';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => (
  <>
    <AdminLogin {...rest}>
      {children}
    </AdminLogin>
    <Footer />
  </>
);

AuthLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
