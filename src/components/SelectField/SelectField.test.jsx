import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectField from './SelectField';

describe('SelectField', () => {
  test('should render correctly', () => {
    const component = shallow(<SelectField />);
    expect(component).toMatchSnapshot();
  });
  it('check options props', () => {
    const props = {
      options: ['asasa'],
    };

    const component = mount(<SelectField {...props} />);
    expect(component.prop('options')).toEqual(['asasa']);
  });
});
