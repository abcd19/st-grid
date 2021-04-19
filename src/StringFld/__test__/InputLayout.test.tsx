import React from 'react';
import {InputLayout, IInputLayoutProps} from '../InputLayout'
import { shallow, render, mount } from 'enzyme';
//import { unmountComponentAtNode } from "react-dom";

jest.useFakeTimers();
const setUp = (props?: IInputLayoutProps) => shallow(<InputLayout {...props}  />);

describe('InputLayout tests', () => {
  it('should created successfully (empty props)', () => {
    const component = setUp();
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('input').get(0).props).toHaveProperty(
      'readOnly',
      false,
    )
  });

  it('prop readOnly works', () => {
    const component = setUp({readOnly: true});
    expect(component.find('input').get(0).props).toHaveProperty(
      'readOnly',
      true,
    )
  });

  it('prop value works', () => {
    const component = setUp({val: 'blabla'});
    expect(component.find('input').get(0).props.value).toBe('blabla');

  });

  it('callback onChange works', () => {
    const onChange =  jest.fn((val) => val)
    const component = setUp({onChange: onChange});
    component.find('input').simulate('change', { target: { value: 'blabla' } });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe('blabla');
  });

  it('callback onChangeDelay works', () => {
    jest.useFakeTimers();
    const onChangeDelay = jest.fn((val) => val);
    const component = setUp({onChangeDelay: onChangeDelay});
    component.find('input').simulate('change', { target: { value: 'blabla' } });
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    jest.clearAllTimers();
  });

});


