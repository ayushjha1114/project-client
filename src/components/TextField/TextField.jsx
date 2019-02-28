import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// default values for props:
const defaultProps = {
  error: '',
};

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error,
      ...rest
    } = this.props;
    return (
      <>
        <div>
          <input type="text" {...rest} style={{ ...style.base }} />
        </div>
      </>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
