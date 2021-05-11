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

  test('readOnly', ()=>{
    const onChange = jest.fn((val) => {});
    const component = mount(<ComboboxFldLayoutEdit onChange={onChange} items={items} readOnly={true} />);
    component.find(ImgButtonLayout).find('div').simulate('click', mockOpenList);
    expect(component.render()).toMatchSnapshot();
    expect(onChange.mock.calls.length).toBe(0);
  })


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

})
