import React from 'react';
import {DirectoryTbl, IDirectoryTblProps} from './../DirectoryTbl';
import {StringFldCell, CheckboxFldCell, ComboboxFldCell, typeColumn} from './../../Grid';
import { shallow, mount} from 'enzyme';
import {GridLayout} from './../../Grid';
import {ItemsLayout} from './../../Grid/Items';
import {HeaderLayout} from './../../Grid/Header';
import {HeaderCellLayout} from './../../Grid/Header/HeaderCellLayout';
import {ToolbarLayout} from './../../Grid/Toolbar'
import {RowLayout} from './../../Grid/Items/Table/RowLayout';
import {HeaderRowLayout} from './../../Grid/Header/HeaderRowLayout';
import {CellLayout} from './../../Grid/Items/Cell/CellLayout'
import {columns, items} from './setUp'

import { StringFldLayoutEdit, FieldLayoutEdit, InputLayout , ImgButtonLayout} from '../../StringFld';


describe('DirectoryTbl', () => {

  it('should created successfully', () => {
    const component = mount(<DirectoryTbl columns = {columns}  />);
    expect(component.render()).toMatchSnapshot();
  });


  it('items property', () => {
    const component = mount(<DirectoryTbl items={items} columns = {columns} />);
    expect(component.render()).toMatchSnapshot();
  });


  test('click add btn', () => {
    // add
    const onChange =  jest.fn((newItems) => {
      expect(newItems.length).toBe(items.length + 1)
    })
    const component = mount(<DirectoryTbl items={items} onChange={onChange} columns={columns} />);
    component.find(ToolbarLayout).find(ImgButtonLayout).at(0).find('div').simulate('click');
    expect(component.render()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalled();
  })


  test('click remove btn',()=>{
    const onChange =  jest.fn((newItems) => {
      expect(newItems.length).toBe(items.length - 1)
    })
    const component = mount(<DirectoryTbl items={items} onChange={onChange} columns={columns} />);
    component.find(RowLayout).at(0).find(CellLayout).at(0).find(StringFldCell).find('td').simulate('mousedown');
    component.find(ToolbarLayout).find(ImgButtonLayout).at(1).find('div').simulate('click');
    expect(component.render()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalled();
  });

  test('select row & change val', () => {
    const onChange =  jest.fn((items) => items)
    const onSelectItem =  jest.fn((item) => item)
    const component = shallow(<DirectoryTbl items={items} onSelectItem = {onSelectItem} onChange={onChange} columns={columns} />);
    let td = component.find(GridLayout).dive().find(ItemsLayout).dive()
                      .find(RowLayout).at(0).dive().find(CellLayout).at(0).dive().find(StringFldCell).dive().find('td');

    td.simulate('mousedown');
    expect(onSelectItem.mock.calls.length).toBe(1);

    let input = component.find(GridLayout).dive().find(ItemsLayout).dive()
    .find(RowLayout).at(0).dive().find(CellLayout).at(0).dive().find(StringFldCell)
    .dive().find(StringFldLayoutEdit).dive().find(FieldLayoutEdit)
    .dive().find(InputLayout).dive().find('input');

    input.simulate('change', {target: {value: 'blabla'}});
    expect(onChange.mock.calls.length).toBe(1);
  })

  test('HEDAER: check sort column click',() => {
    const component = shallow(<DirectoryTbl items={items} columns={columns} />);
    let cell = component.find(GridLayout).dive()
        .find(HeaderLayout).dive().find(HeaderRowLayout).dive().find(HeaderCellLayout)
        .at(0).dive();
    cell.find(".st-grid-head-cell-textContainer").simulate('click');
    expect(cell.find(".st-grid-head-cell-sortAnchor")).toHaveLength(1)
    cell.find(".st-grid-head-cell-textContainer").simulate('click');
    expect(cell.find(".st-grid-head-cell-sortAnchor")).toHaveLength(1)
    cell.find(".st-grid-head-cell-textContainer").simulate('click');
    expect(cell.find(".st-grid-head-cell-sortAnchor")).toHaveLength(0)
  })

  test('HEDAER: change columns width',() => {
    const component = shallow(<DirectoryTbl items={items} columns={columns} />);
    let cell = component.find(GridLayout).dive()
        .find(HeaderLayout).dive().find(HeaderRowLayout).dive().find(HeaderCellLayout)
        .at(0)
    cell.dive().find('.st-grid-head-cell-widthChangeAnchor').simulate('mousedown',{pageX: 200});
    
  });


  test('ITEMS: onmousewhell & scrolls',()=>{
    const component = mount(<DirectoryTbl items={items.concat(items, items,items)}  columns={columns} />);
    let wr = component.find('.st-grid-body-div');
    wr.simulate('wheel',{deltaY: 200})
    wr.simulate('wheel',{deltaY: -100})
    wr.simulate('scroll',{deltaY: 200})
    wr.simulate('scroll',{deltaY: -100})
    wr = component.find('.st-grid-rightScroll-div');
    wr.simulate('scroll',{deltaY: 200})
    wr.simulate('scroll',{deltaY: -100})

    wr = component.find('.st-grid-bottomScroll-div');
    wr.simulate('scroll',{deltaY: 200})
    wr.simulate('scroll',{deltaY: -100})
    
  });


  
 })
