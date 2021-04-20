import React from 'react';
import { shallow } from 'enzyme';
import {ImgButtonLayout, IImgButtonLayoutProps} from '../ImgButtonLayout';

const setUp = (props?: ImgButtonLayout) => shallow(<ImgButtonLayout {...props}  />);

describe('ImgButtonLayout tests', () => {
  
  test('mousedown event', () => {
    const component = setUp();
    component.find('div').simulate('mousedown');
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'backgroundColor',
      'gray',
    );
  });

  test('mouseenter event', () => {
    const component = setUp();
    component.find('div').simulate('mouseenter');
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'backgroundColor',
      'lightgray',
    );
  });

  test('mouseleave event', () => {
    const component = setUp();
    component.find('div').simulate('mouseleave');
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'backgroundColor',
      'transparent',
    );
  });


  test('mouseup event', () => {
    const component = setUp();
    component.find('div').simulate('mouseup');
    expect(component.find('div').get(0).props.style).toHaveProperty(
      'backgroundColor',
      'transparent',
    );
  });

})
