import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.number,
  second: PropTypes.number,
  operator: PropTypes.string,
  children: PropTypes.func,
};
const defaultProps = {
  first: 0,
  second: 0,
  operator: '',
  children: () => {},
};

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculate = (first, second, operator) => {
  /*     switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      if (second !== 0) {
        return first / second;
      } else if (second === 0) {
        return 'infinity';
      }
    default:
      return 'Invalid Operation';
    } */
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
      <>
        { children(first, second, operator, result) }
      </>
    );
  }
}

Math.propTypes = propTypes;
Math.defaultProps = defaultProps;

export default Math;
