import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  // onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
};

// default values for props:
const defaultProps = {
  color: '',
  disabled: false,
  style: {},
};

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      disabled,
      color,
      ...rest
    } = this.props;
    return (
      <>
        <input type="submit" disabled={disabled} {...rest} style={{ ...style.base, ...color }} />
      </>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
