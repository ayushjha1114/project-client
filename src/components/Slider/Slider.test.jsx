import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider from './Slider';

describe('Slider', () => {
  test('should render correctly', () => {
    const component = shallow(<Slider />);
    expect(component).toMatchSnapshot();
  });
  it('check options props', () => {
    const props = {
      options: ['asasa'],
    };

    const component = mount(<Slider {...props} />);
    expect(component.prop('options')).toEqual(['asasa']);
  });
});
