import React from 'react';
import {ComboboxFldLayoutEdit, IComboboxFldLayoutEditProps} from '../ComboboxFldLayoutEdit'
import {FieldLayoutEdit} from './../../StringFld/FieldLayoutEdit';
import {InputLayout} from './../../StringFld/InputLayout';
import {ImgButtonLayout} from './../../StringFld/ImgButtonLayout'
import {ListLayout} from './../ListLayout';
import {ListItemLayout} from './../ListItemLayout';
import {SearchFldLayoutEdit} from './../SearchFldLayoutEdit';
import { shallow} from 'enzyme';

const items = [
  {raw: 'raw1', display: 'display1'},
  {raw: 'raw2', display: 'display2'}];

const mockOpenList = { currentTarget: {
  getBoundingClientRect: () => { return {left: 100, top: 100}}
  }}

/*let list = undefined;
beforeEach(() => {
  list = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
});*/
const setUp = (props?: IComboboxFldLayoutEditProps) => {

  const items = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
  
  return shallow(<ComboboxFldLayoutEdit items={items} { ...props}  />);
} 

describe('Combobox', () => {

  it('should created successfully', () => {
    const component = setUp();
    expect(component.find(FieldLayoutEdit)).toHaveLength(1);
    expect(component.find(FieldLayoutEdit).dive().find(InputLayout)).toHaveLength(1);
    expect(component.find(FieldLayoutEdit).dive().find(ImgButtonLayout)).toHaveLength(1);
  });


  test('select value by user click', () => {
    const onChange =  jest.fn((val) => val)
    const component = setUp({onChange: onChange, items: items});
    component.find(FieldLayoutEdit).dive().find(ImgButtonLayout).dive().find('div').simulate('click', mockOpenList );
    expect(component.find(ListLayout)).toHaveLength(1);
    expect(component.find(ListLayout).dive().find(ListItemLayout)).toHaveLength(2);
    component.find(ListLayout).dive().find(ListItemLayout).first().dive().find('div').simulate('click', {stopPropagation: () => true});
    expect(component.find(FieldLayoutEdit)).toHaveLength(1);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.results[0].value).toStrictEqual({"display": "display1", "raw": "raw1"});
  });

  
  test('value prop', () => {
    const component = setUp({val: items[0], items: items});
    expect(component.find(FieldLayoutEdit).dive().find(InputLayout).get(0).props.val).toBe(items[0].display);
  });


  test('search test', () => {

    const list = [];
    for(let i = 0; i < 20; i++)
    {
      list.push({ raw: "text" + i, display: "text" + i })
    }
    const component = setUp({items: list});
    component.find(FieldLayoutEdit).dive().find(ImgButtonLayout).dive().find('div').simulate('click', mockOpenList);
    expect(component.find(ListLayout).dive().find(ListItemLayout)).toHaveLength(20);
    expect(component.find(ListLayout).dive().find(SearchFldLayoutEdit)).toHaveLength(1);
    //jest.useFakeTimers();
    component.find(ListLayout).dive().find(SearchFldLayoutEdit).dive()
        .find(FieldLayoutEdit).dive().find(InputLayout).dive().find('input').simulate('change', {target: {value: '1'}});
    //jest.runAllTimers();
    //jest.advanceTimersByTime(1000);
    //jest.clearAllTimers();
    //expect(component.find(ListLayout).dive().find(ListItemLayout)).toHaveLength(11);
    //jest.clearAllTimers();
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
