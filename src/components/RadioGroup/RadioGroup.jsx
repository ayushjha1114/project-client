import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
};

// default values for props:
const defaultProps = {
  error: '',
  options: [],
  value: '',
  onChange: () => {},
};

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, options, ...rest
    } = this.props;
    const css = `
    .radio{
        cursor: pointer;
    }`;
    return (
      <>
        <style>{css}</style>
        <div>
          <h4> What do you do?</h4>
          {options.map(item => (
            <div key={item.label}>
              <label htmlFor="asf">
                <input type="radio" name="sport" {...rest} key={item.label} value={item.label} />
                <span className="radio">{item.label}</span>
              </label>
            </div>
          ))}
          { (error) ? <p style={{ ...style.para }}>{error}</p> : '' }
        </div>
      </>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
