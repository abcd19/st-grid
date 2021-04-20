import React from 'react';
import {ComboboxFldLayoutEdit, IComboboxFldLayoutEditProps} from '../ComboboxFldLayoutEdit'
import {FieldLayoutEdit} from './../../StringFld/FieldLayoutEdit';
import {InputLayout} from './../../StringFld/InputLayout';
import { shallow} from 'enzyme';
/*let list = undefined;
beforeEach(() => {
  list = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
});*/
const setUp = (props?: IComboboxFldLayoutEditProps) => {
  
  let list = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
  
  return shallow(<ComboboxFldLayoutEdit items = {list} { ...props}  />);
} 

describe('Combobox', () => {

  it('should created successfully (empty props)', () => {
    const component = setUp();
    expect(component.find(FieldLayoutEdit)).toHaveLength(1);
    expect(component.find(FieldLayoutEdit).dive().find(InputLayout)).toHaveLength(1);
  });

/*
 
  it('Инициализация без падений', ()=>{
    const wrapper = mount(<ComboboxFldLayoutEdit />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('Проверка атрибута val', ()=>{
    let val = {raw: 'raw1'}
    const wrapper = mount(<ComboboxFldLayoutEdit val={val} items={list}/>);
    expect(wrapper.find('input').props().value).toBe('display1');
  });

  it('Передача несуществующего значения в прос val', ()=>{
    let val = {raw: 'raw5Unknown'}
    const wrapper = mount(<ComboboxFldLayoutEdit val={val} items={list}/>);
    expect(wrapper.find('input').props().value).toBe('');
  });

  it ('Проверка атрибута clearBtnFlag', ()=>{
    const onChange = jest.fn((val) =>val);
    let val = {raw: 'raw1'}
    const wrapper = mount(<ComboboxFldLayoutEdit val={val} onChange={onChange} items={list} clearBtnFlag/>);
    //Выбрали значение
    expect(wrapper.find('input').props().value).toBe('display1');    
    //Есть кнопка очистить
    expect(wrapper.find('div.st_icon_24_clearCellGray')).toHaveLength(1);
    //кликаем по кнопке очистить
    wrapper.find('div.st_icon_24_clearCellGray').simulate('click');
    //колбек вызван 1 раз
    expect(onChange.mock.calls.length).toBe(1);
    //в значении пустая строка
    expect(onChange.mock.results[0].value).toBe('');
    
  });

  it('Проверка onChange',()=>{

    const onChange = jest.fn((val) =>val);
    const wrapper = mount(<ComboboxFldLayoutEdit onChange={onChange} items={list} />);
    
    //st_icon_24_combobox
    let btn = wrapper.find('div.st_icon_24_combobox');
    expect(btn).toHaveLength(1);
    //открываем список на выбор
    btn.simulate('click');
    let LIL = wrapper.find(ListLayout).find(ListItemLayout);
    //список содержит 2 элемента
    expect(LIL).toHaveLength(2);
    let firstDiv = LIL.first().find('div');
    //выбираем первый 
    firstDiv.simulate('click');
    //проверяем значение
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toEqual({"display":"display1", "raw": "raw1" });
    //cписок закрылся
    expect(wrapper.find(ListLayout)).toHaveLength(0);
  });
*/

 })
