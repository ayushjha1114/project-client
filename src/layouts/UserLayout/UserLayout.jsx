import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import UserNavbar from '../components/UserNavbar/UserNavBar';

const UserLayout = ({ children, ...rest }) => (
  <>
    <UserNavbar />
    <div {...rest}>
      {children}
    </div>
    <Footer />

  </>
);

UserLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default UserLayout;
