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
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
