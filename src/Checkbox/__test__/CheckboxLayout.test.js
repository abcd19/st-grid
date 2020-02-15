//общие функции
import React from 'react';
import {CheckboxLayout} from './../CheckboxLayout'
import renderer from 'react-test-renderer';
test ('Checkbox tests', ()=>{
  const component = renderer.create(<CheckboxLayout />, );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
