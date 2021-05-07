import React from 'react';
import { ComboboxFldLayoutEdit, IComboboxFldLayoutEditProps, SearchFldLayoutEdit } from '../'
import { FieldLayoutEdit, ImgButtonLayout, InputLayout } from './../../StringFld';
import { ListLayout } from './../ListLayout';
import { ListItemLayout } from './../ListItemLayout';
import { shallow, mount } from 'enzyme';

const items = [
  { raw: 'raw1', display: 'display1' },
  { raw: 'raw2', display: 'display2' }];

const mockOpenList = {
  currentTarget: {
    getBoundingClientRect: () => { return { left: 100, top: 100 } }
  }
}

/*let list = undefined;
beforeEach(() => {
  list = [
    {raw: 'raw1', display: 'display1'},
    {raw: 'raw2', display: 'display2'}];
});*/
const setUp = (props?: IComboboxFldLayoutEditProps) => {

  const items = [
    { raw: 'raw1', display: 'display1' },
    { raw: 'raw2', display: 'display2' }];

  return shallow(<ComboboxFldLayoutEdit items={items} {...props} />);
}

describe('Combobox', () => {

  let container: HTMLElement;
  HTMLElement.prototype.scrollIntoView = function() {};
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should created successfully', () => {
    const component = mount(<ComboboxFldLayoutEdit items={items} />, { attachTo: container });
    expect(component.render()).toMatchSnapshot();
  });

  test('value prop', () => {
    const component = setUp({ val: items[0], items: items });
    expect(component.find(FieldLayoutEdit).dive().find(InputLayout).get(0).props.val).toBe(items[0].display);
  });


  test('calback onChange', () => {
    const onChange = jest.fn((val) => {
      expect(val).toStrictEqual(items[0]);
    })
    const component = mount(<ComboboxFldLayoutEdit onChange={onChange} items = {items} />);
    expect(component.find(ListLayout)).toHaveLength(0);
    component.find(ImgButtonLayout).find('div').simulate('click', mockOpenList);
    expect(component.find(ListLayout)).toHaveLength(1);
    expect(component.find(ListLayout).find(ListItemLayout)).toHaveLength(items.length);

    component.find(ListItemLayout).first().find('div').simulate('click', { stopPropagation: () => true });
    expect(component.find(ListLayout)).toHaveLength(0);
    expect(onChange).toHaveBeenCalled();
  });


  test('search test', () => {

    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({ raw: "text" + i, display: "text" + i })
    }
    const component = mount(<ComboboxFldLayoutEdit items = {items} />, { attachTo: container });
    component.find(ImgButtonLayout).find('div').simulate('click', mockOpenList);
    jest.useFakeTimers();
    component.find(SearchFldLayoutEdit).find('input').simulate('change', { target: { value: '1' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(2000);
    //console.dir(component.find(ListLayout).instance().state)
    component.find(ListLayout).update();
    expect(component.find(ListLayout).find(ListItemLayout)).toHaveLength(12)
    jest.clearAllTimers();


    component.find(SearchFldLayoutEdit).find('input').simulate('change', { target: { value: '' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(2000);
    jest.clearAllTimers();
    component.find(ListLayout).update();
    expect(component.find(ListLayout).find(ListItemLayout)).toHaveLength(30)
  });


  test('click searchBtn', () => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({ raw: "text" + i, display: "text" + i })
    }

    const component = mount(<ComboboxFldLayoutEdit items = {items} />, { attachTo: container });
    component.find(ImgButtonLayout).find('div').simulate('click', mockOpenList);
    component.find(SearchFldLayoutEdit).find('input').simulate('change', { target: { value: '1' } });
    component.find(SearchFldLayoutEdit).find(ImgButtonLayout).find('div').simulate('click');
    expect(component.find(ListLayout).find(ListItemLayout)).toHaveLength(12)
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
