import React from 'react';
//import renderer from 'react-test-renderer';
import {shallow,} from "enzyme";
import {CheckboxFldLayoutEdit} from './../CheckboxFldLayoutEdit';

describe('Checkbox tests', () => {

  test('create successfully', () => {
    const wrapper = shallow(<CheckboxFldLayoutEdit  />);
    expect(wrapper.find('div')).toHaveLength(1);
  })

});
