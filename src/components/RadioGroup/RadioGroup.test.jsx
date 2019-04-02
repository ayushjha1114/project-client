import React from 'react';
import { shallow, mount } from 'enzyme';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  test('should render correctly', () => {
    const component = shallow(<RadioGroup />);
    expect(component).toMatchSnapshot();
  });
  it('check options props', () => {
    const props = {
      options: [],
    };

    const component = mount(<RadioGroup {...props} />);
    expect(component.prop('options')).toEqual([]);
  });
});
