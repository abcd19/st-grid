import React from 'react';
//import renderer from 'react-test-renderer';
import {shallow,} from "enzyme";
import {CheckboxFldLayoutEdit} from './../CheckboxFldLayoutEdit';
import {ICheckboxFldLayoutEditProps} from './../CheckboxFldLayoutEdit';

const setUp = (props?: ICheckboxFldLayoutEditProps) => shallow(<CheckboxFldLayoutEdit {...props}  />)

describe('Checkbox tests', () => {

 
  /*beforeEach(()=>{
    
  });*/

  it('should created successfully (empty props)', () => {
    const component = setUp();
    const div = component.find('div');
    expect(div).toHaveLength(1);
    expect(div.get(0).props.style).toHaveProperty(
      'opacity',
      '1',
    );
    expect(div.get(0).props.style).toHaveProperty(
      'backgroundPosition',
      '30px 15px',
    );   
  });


  it('should prop readOnly works', () => {
    const onChange = jest.fn((val) =>val);
    const component = setUp({onChange, readOnly: true});
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'opacity',
      '0.5',
    );

    component.find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(0);
  })


  it('should prop value works', () => {
    const val = true;
    const onChange =  (newVal: boolean) => {
      expect(newVal).toBe(true);
    }
    const component = setUp({onChange, val});
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'backgroundPosition',
      '0px 15px',
    );
  })



  it('changed value false => true', () => {
    const onChange = jest.fn((val) =>val);
    const component = setUp({val: true, onChange});
    component.find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe(false);
    //const inst = component.instance();
    //inst.onClickHandle();
  });

  
  it('changed value true => false', () => {
    const onChange = jest.fn((val) =>val);
    const component = setUp({val: false, onChange});
    component.find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe(true);
  });
  
});
