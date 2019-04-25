import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import AdminNavbar from '../components/AdminNavbar';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <AdminNavbar {...rest} />
    <div {...rest}>
      {children}
    </div>
    <Footer />

  </>
);

PrivateLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
