import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  test('should render correctly', () => {
    const component = shallow(<Button />);
    expect(component).toMatchSnapshot();
  });
  it('check the disabled props', () => {
    const props = {
      disabled: true,
    };

    const component = mount(<Button {...props} />);
    expect(component.prop('disabled')).toEqual(true);
  });
});
