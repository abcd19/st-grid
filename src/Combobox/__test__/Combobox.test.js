import React from 'react';
import {ComboboxLayoutEdit} from './../ComboboxLayoutEdit'
import {ListLayout} from './../ListLayout';
import {ListItemLayout } from './../ListItemLayout';
import { mount } from 'enzyme';

let list = undefined;
beforeEach(() => {
  list = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
});

describe('Combobox', () => {


 
  it('Инициализация без падений', ()=>{
    const wrapper = mount(<ComboboxLayoutEdit />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('Проверка атрибута val', ()=>{
    let val = {raw: 'raw1'}
    const wrapper = mount(<ComboboxLayoutEdit val={val} items={list}/>);
    expect(wrapper.find('input').props().value).toBe('display1');
  });

  it('Передача несуществующего значения в прос val', ()=>{
    let val = {raw: 'raw5Unknown'}
    const wrapper = mount(<ComboboxLayoutEdit val={val} items={list}/>);
    expect(wrapper.find('input').props().value).toBe('');
  });

  it ('Проверка атрибута clearBtnFlag', ()=>{
    const onChange = jest.fn((val) =>val);
    let val = {raw: 'raw1'}
    const wrapper = mount(<ComboboxLayoutEdit val={val} onChange={onChange} items={list} clearBtnFlag/>);
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
    const wrapper = mount(<ComboboxLayoutEdit onChange={onChange} items={list} />);
    
    //st_icon_24_combobox
    let btn = wrapper.find('div.st_icon_24_combobox');
    expect(btn).toHaveLength(1);
    //открываем список на выбор
    btn.simulate('click');
    let listL = wrapper.find(ListLayout);
    //expect(list).toHaveLength(2);
    //console.log(listL.debug());
   // expect(list).toHaveLength(1);
    //let listItems = list.children();
    
    //console.log(listItems.debug());
    //expect(listItems).toHaveLength(2);
    //выбираем первый пункт
    //listItem.find()
  });


 })
