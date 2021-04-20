import React from 'react';
import {StringFldLayoutEdit, IStringFldLayoutEditProps} from '../StringFldLayoutEdit'
import {FieldLayoutEdit} from '../FieldLayoutEdit';
import { shallow} from 'enzyme';
import {InputLayout} from '../InputLayout'
import {ImgButtonLayout} from '../ImgButtonLayout';


const setUp = (props?: IStringFldLayoutEditProps) => shallow(<StringFldLayoutEdit {...props}  />);

describe('StringFld tests', () => {
  
  it('should created successfully (empty props)', () => {
    const component = setUp();
    expect(component.find(FieldLayoutEdit)).toHaveLength(1);
    expect(component.find(FieldLayoutEdit).dive().find(InputLayout)).toHaveLength(1);
  });

  it('callback onChange works', () => {
    const onChange =  jest.fn((val) => val)
    const component = setUp({onChange: onChange});
    component.find(FieldLayoutEdit).dive().find(InputLayout).dive().find('input').simulate('change', {target: {value: 'blabla'}});
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe('blabla');
  });

  it('callback onChangeDelay works', () => {
    const onChange =  jest.fn((val) => val)
    const component = setUp({onChangeDelay: onChange});
    jest.useFakeTimers();
    component.find(FieldLayoutEdit).dive().find(InputLayout).dive().find('input').simulate('change', {target: {value: 'blabla'}});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    jest.clearAllTimers();
  });

  it('clearBtnFlag works', () => {
    const onChange =  jest.fn((val) => val)
    const component = setUp({onChange: onChange, clearBtnFlag: true});
    const clearBtn = component.find(FieldLayoutEdit).dive().find(ImgButtonLayout);
    expect(clearBtn).toHaveLength(1);
    clearBtn.dive().find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toBe('');
  });

  it('readOnly works', () =>{
    const component = setUp({readOnly: true});
    const input = component.find(FieldLayoutEdit).dive().find(InputLayout).dive().find('input').get(0);
    expect(input.props).toHaveProperty(
      'readOnly',
      true,
    )
  });

  /*it('should prop readOnly works', () => {
    const component = setUp({readOnly: true});
    console.dir(component.debug())
    //expect(component.find(FieldLayoutEdit)).toHaveLength(1);
  });

 /* it ('Инициализация без падений', ()=>{
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
    
  });*/


})
