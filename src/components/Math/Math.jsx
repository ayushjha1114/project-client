import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
const defaultProps = {
};

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculate = (first, second, operator) => {
    if (operator === '+') {
      return first + second;
    }
    if (operator === '-') {
      return first - second;
    }
    if (operator === '*') {
      return first * second;
    }
    if (operator === '/' && second !== 0) {
      return first / second;
    }
    if (operator === '/' && second === 0) {
      return 'infinity';
    }
    return 'Invalid Operation';
  }

  render() {
    const {
      first,
      second,
      operator,
      children,
    } = this.props;
    const result = this.calculate(first, second, operator);
    return (
      <div>
        { children(first, second, operator, result) }
      </div>
    );
  }
}

Math.propTypes = propTypes;
Math.defaultProps = defaultProps;

export default Math;
