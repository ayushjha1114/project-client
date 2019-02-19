import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};

// default values for props:
const defaultProps = {
  error: '',
  options: [],
};

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error,
      options,
      ...rest
    } = this.props;
    return (
      <>
        <div>
          <h4> What do you do?</h4>
          {
            options.map(item => (
              <div>
                <input type="radio" name="sport" {...rest} value={item.label} />
                {' '}
                {item.label}
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
