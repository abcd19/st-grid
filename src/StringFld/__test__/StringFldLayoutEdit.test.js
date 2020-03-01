import React from 'react';
import {StringFldLayoutEdit} from './../StringFldLayoutEdit'
import { shallow, render, mount } from 'enzyme';
import { unmountComponentAtNode } from "react-dom";

//для таймеров внутри StringFldLayoutEdit
jest.useFakeTimers();

describe('StringFld', () => {
 

  it ('Инициализация без падений', ()=>{
    const wrapper = mount(<StringFldLayoutEdit />);
    expect(wrapper.find('input')).toHaveLength(1);
  
  });

  it ('Проверка атрибута val',()=>{
    const wrapper = mount(<StringFldLayoutEdit val='test' />); 
    let inp = wrapper.find('input');  
    expect(inp.props().value).toBe("test")
  });

  
  it ('Проверка атрибута clearBtnFlag', ()=>{
    const onChange = jest.fn((val) =>val);
 
    const wrapper = mount(<StringFldLayoutEdit onChange={onChange} clearBtnFlag/>);
        
    //Есть кнопка очистить
    expect(wrapper.find('div.st_icon_24_clearCellGray')).toHaveLength(1);
 
    //кликаем по кнопке очистить
    wrapper.find('div.st_icon_24_clearCellGray').simulate('click');
    //колбек вызван 1 раз
    expect(onChange.mock.calls.length).toBe(1);
    //в значении пустая строка
    expect(onChange.mock.results[0].value).toBe('');
    
  });
  
  it ('Проверка атрибута onChange ', () =>{
    //из-за таймера внутри обработчика onChange
    jest.useFakeTimers();
    const onChange = jest.fn((val) =>val);
    const wrapper = mount(<StringFldLayoutEdit onChange={onChange} />);   
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0].value).toBe('123');
  });


  it ('Проверка атрибута onChangeDelay',() =>{
    //мокаем таймеры
    jest.useFakeTimers();
    const onChangeDelay = jest.fn((val) =>val);
    const wrapper = mount(<StringFldLayoutEdit handler = {{changeDelay: onChangeDelay}} />); 

    wrapper.find('input').simulate('change', { target: { value: '1' } });
    //запустили таймеры
    jest.runAllTimers();
    

    expect(onChangeDelay).toHaveBeenCalledTimes(1);
    //expect(onChangeDelay.mock.results[0].value).toBe('1');
    //как проверить аргументы????
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    
  });


})
