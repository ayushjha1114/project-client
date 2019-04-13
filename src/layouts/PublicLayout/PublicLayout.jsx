import React from 'react';
import PropTypes from 'prop-types';
import Navbar, { Footer } from '../components';

const PublicLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <div {...rest}>
      {children}
    </div>
    <Footer />

  </>
);

PublicLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PublicLayout;
