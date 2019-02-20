import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
};

// default values for props:
const defaultProps = {
  color: '',
  disabled: false,
  style: {},
};

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      disabled,
      ...rest
    } = this.props;
    return (
      <>
        <input type="submit" disabled={disabled} {...rest} style={{ ...style.base }} />
      </>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
