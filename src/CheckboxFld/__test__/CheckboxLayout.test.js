//общие функции
import React from 'react';
import {CheckboxLayout} from './../CheckboxLayout'
import renderer from 'react-test-renderer';


describe('Checkbox tests', () =>{

  test ('val = true', ()=>{
    let onChange = (val) => {
      expect(val).toBe(false);
    }
    const component = renderer.create(<CheckboxLayout val={true} onChange={onChange} />, );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onClick();
  });

  test ('val = false', ()=>{
    let onChange = (val) => {
      expect(val).toBe(true);
    }

    const component = renderer.create(<CheckboxLayout val={false} onChange={onChange}/>, );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onClick();
  });

  test ('val = undefined', ()=>{

    let onChange = (val) => {
      expect(val).toBe(true);
    }

    const component = renderer.create(<CheckboxLayout onChange={onChange} />, );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onClick();
  });

});
