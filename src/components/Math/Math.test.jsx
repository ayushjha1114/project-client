import React from 'react';
import { shallow, mount } from 'enzyme';
import Math, { calculate } from './Math';

describe('Math', () => {
  test('should render correctly', () => {
    const component = shallow(<Math />);
    expect(component).toMatchSnapshot();
  });
  it('check the type of props', () => {
    const props = {
      first: 0,
      second: 0,
    };

    const component = mount(<Math {...props} />);
    expect(component.prop('first')).toEqual(0);
    expect(component.prop('second')).toEqual(0);
  });
  test('Adding 5+2 equal to 7 in calculate func', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(5, 2, '+')).toBe(7);
  });
  test('Subtacting 5-2 equal to 3 in calculate func', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(5, 2, '-')).toBe(3);
  });
  test('Multiplying 5*2 equal to 10 in calculate func', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(5, 2, '*')).toBe(10);
  });
  test('Dividing 5/2 equal to 10 in calculate func', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(5, 2, '/')).toBe(2.5);
  });
  test('Dividing 5/0 equal to infinity in calculate func', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(5, 0, '/')).toBe('infinity');
  });
  test('fake data 2?3 equal to Invalid Operation', () => {
    const component = shallow(<Math />);

    expect(component.instance().calculate(2, 3, '?')).toBe('Invalid Operation');
  });
});
