import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <div {...rest}>
      {children}
    </div>
  </>
);

PrivateLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PrivateLayout;
