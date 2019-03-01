import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};

// default values for props:
const defaultProps = {
  value: '',
  error: '',
  options: [],
  defaultText: 'Select',
};

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error,
      defaultText,
      options,
      ...rest
    } = this.props;
    return (
      <>
        <div>
          <select {...rest} style={{ ...style.base }}>
            <option value={defaultText}>{defaultText}</option>
            {
              options.map(item => (
                <option key={item.label} value={item.label}>{item.label}</option>
              ))
            }
          </select>
          { (error) ? <p style={{ ...style.para }}>{error}</p> : '' }
        </div>
      </>
    );
  }
}
SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
