import React from 'react';
import { DirectoryTbl, IDirectoryTblProps } from './../DirectoryTbl';
import { StringFldCell, CheckboxFldCell, ComboboxFldCell, typeColumn, typeItem } from './../../Grid';
import { shallow, mount } from 'enzyme';
import { GridLayout } from './../../Grid';
import { ItemsLayout } from './../../Grid/Items';
import { HeaderLayout } from './../../Grid/Header';
import { HeaderCellLayout } from './../../Grid/Header/HeaderCellLayout';
import { ToolbarLayout } from './../../Grid/Toolbar'
import { RowLayout } from '../../Grid/Items/RowLayout';
import { HeaderRowLayout } from './../../Grid/Header/HeaderRowLayout';
import { CellLayout } from './../../Grid/Items/CellLayout'
import { columns, items } from './setUp'

import { StringFldLayoutEdit, FieldLayoutEdit, InputLayout, ImgButtonLayout } from '../../StringFld';

const SEL_ROW_NUM = 0;
const CELL_LOGIN_NUM = 0;


describe('DirectoryTbl', () => {

  let container: HTMLElement;
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should created successfully', () => {
    const component = mount(<DirectoryTbl columns={columns} />);
    expect(component.render()).toMatchSnapshot();
  });


  it('items property', () => {
    const component = mount(<DirectoryTbl items={items} columns={columns} />);
    expect(component.render()).toMatchSnapshot();
  });


  test('click add btn', () => {
    // add
    const onChange = jest.fn((newItems) => {
      expect(newItems.length).toBe(items.length + 1)
    })

    const onSelectItem = jest.fn((selRow) => {});

    const component = mount(<DirectoryTbl onSelectItem={onSelectItem} items={items} onChange={onChange} columns={columns} />);
    component.find(ToolbarLayout).find(ImgButtonLayout).at(0).find('div').simulate('click');
    expect(component.render()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalled();
    expect(onSelectItem).toHaveBeenCalled();


    const componentNoHandlers = mount(<DirectoryTbl items={items}  columns={columns} />);
    componentNoHandlers.find(ToolbarLayout).find(ImgButtonLayout).at(0).find('div').simulate('click');

    //no btn
    const componentNoBtn = mount(<DirectoryTbl addBtnFlag={false}  items={items}  columns={columns} />);

  })


  test('click remove btn', () => {
    const onChange = jest.fn((newItems) => {
      expect(newItems.length).toBe(items.length - 1)
    })

    const onSelectItem = jest.fn((newItems) => { })
   
    const component = mount(<DirectoryTbl items={items} onChange={onChange} onSelectItem={onSelectItem} columns={columns} />);
    component.find(RowLayout).at(0).find(CellLayout).at(0).find(StringFldCell).find('td').simulate('mousedown');
    component.find(ToolbarLayout).find(ImgButtonLayout).at(1).find('div').simulate('click');
    expect(component.render()).toMatchSnapshot();
    expect(onChange).toHaveBeenCalled();
    expect(onSelectItem).toHaveBeenCalled();

    //no select empty
    const componentEmpty = mount(<DirectoryTbl items={[]} onChange={onChange} columns={columns} />);
    componentEmpty.find(ToolbarLayout).find(ImgButtonLayout).at(1).find('div').simulate('click');

    //empty handlers
    const componentNoHandlers = mount(<DirectoryTbl  items={items}  columns={columns} />);
    componentNoHandlers.find(ToolbarLayout).find(ImgButtonLayout).at(1).find('div').simulate('click');
    //no btn
    const componentNoBtn = mount(<DirectoryTbl removeBtnFlag={false}  items={items}  columns={columns} />);
  });

  test('select row & change val', () => {
    const onChange = jest.fn((newItems) => {
      expect(newItems[SEL_ROW_NUM].data.login).toBe('blabla')
    });

    const onSelectItem = jest.fn((selRow) => {
      expect(selRow.data.login).toBe('Jane')
    });

    const component = mount(<DirectoryTbl onSelectItem={onSelectItem} items={items} onChange={onChange} columns={columns} />);
    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('mousedown');
    expect(onSelectItem).toHaveBeenCalled();
    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find('input').simulate('change', { target: { value: 'blabla' } });
    expect(onChange).toHaveBeenCalled();
  })


  test('onMouseEnterItem & onMouseLeaveItem & onDoubleClickItem & onClick works fine', () => {
    const onMouseEnterItem = jest.fn((rowObject: typeItem, cellAlias: string) => { });
    const onMouseLeaveItem = jest.fn((rowObject: typeItem, cellAlias: string) => { })
    const onDoubleClickItem = jest.fn((rowObject: typeItem, cellAlias: string) => { })
    const onClickItem = jest.fn((rowObject: typeItem, cellAlias: string) => { })
    const component = mount(<DirectoryTbl onClickItem={onClickItem} onDoubleClickItem={onDoubleClickItem} onMouseEnterItem={onMouseEnterItem}
      onMouseLeaveItem={onMouseLeaveItem} items={items} columns={columns} />);

    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('mouseenter');
    expect(onMouseEnterItem).toHaveBeenCalled();

    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('mouseleave');
    expect(onMouseLeaveItem).toHaveBeenCalled();

    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('dblclick');
    expect(onDoubleClickItem).toHaveBeenCalled();

    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('click');
    expect(onClickItem).toHaveBeenCalled();
  });


  test('click header cell (sorting)', () => {
    const component = mount(<DirectoryTbl items={items} columns={columns} />);
    component.find(".st-grid-head-cell-textContainer").at(CELL_LOGIN_NUM).simulate('click');
    expect(component.find(".st-grid-head-cell-sortAnchor")).toHaveLength(1);
    component.find(RowLayout).at(SEL_ROW_NUM).find(CellLayout).at(CELL_LOGIN_NUM).find(StringFldCell).find('td').simulate('mousedown');
    component.find(".st-grid-head-cell-textContainer").at(CELL_LOGIN_NUM).simulate('click');
    expect(component.find(".st-grid-head-cell-sortAnchor")).toHaveLength(1);
    component.find(".st-grid-head-cell-textContainer").at(CELL_LOGIN_NUM).simulate('click');
    expect(component.find(".st-grid-head-cell-sortAnchor")).toHaveLength(0);

    //sorting when empty items
    component.unmount();
    const componentEmptyItems = mount(<DirectoryTbl items={[]} columns={columns} />);
    componentEmptyItems.find(".st-grid-head-cell-textContainer").at(CELL_LOGIN_NUM).simulate('click');
    expect(componentEmptyItems.find(".st-grid-head-cell-sortAnchor")).toHaveLength(1);

    //sorting flag == false
    const componentSortingFlag = mount(<DirectoryTbl sortingFlag={false} items={items} columns={columns} />);
    componentSortingFlag.find(".st-grid-head-cell-textContainer").at(CELL_LOGIN_NUM).simulate('click');
  })


  test('change header cell width', () => {
    const component = mount(<DirectoryTbl items={items} columns={columns} />, { attachTo: container });
    component.find(".st-grid-head-cell-widthChangeAnchor").at(CELL_LOGIN_NUM).simulate('mousedown', { pageX: 200 });
    expect(component.render()).toMatchSnapshot();


    let clientX = 200
    for (let i = 0; i < 10; i++) {
      clientX = clientX + 20;
      const ev = new window.MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(ev, 'pageX', { get: () => clientX });
      component.getDOMNode().dispatchEvent(ev);
    }

    window.document.dispatchEvent(new MouseEvent("mouseup"));
    expect(component.render()).toMatchSnapshot();
  });


  test('onmousewhell & scrolls on items', () => {


    const component = mount(<DirectoryTbl items={items.concat(items, items, items)} columns={columns} />);
    let wr = component.find('.st-grid-body-div');
    Object.defineProperty(component.find('.st-grid-rightScroll-div').getDOMNode() , 'scrollHeight' , { configurable: true, value: 100 });

    //wheel tests
    wr.simulate('wheel', { deltaY: 100 });
    wr.simulate('wheel', { deltaY: 100 });
    wr.simulate('wheel', { deltaY: -100 });
    wr.simulate('wheel', { deltaY: -100 });
    
    //scroll moving
    wr = component.find('.st-grid-rightScroll-div');
    wr.simulate('wheel', { deltaY: 100 });
    wr.simulate('scroll', { deltaY: 100 })
    wr.simulate('scroll', { deltaY: -100 })
    wr.simulate('wheel', { deltaY: -100 });
    
    wr = component.find('.st-grid-bottomScroll-div');
    wr.simulate('scroll', { deltaY: 100 })
    wr.simulate('scroll', { deltaY: 100 })
    wr.simulate('scroll', { deltaY: -100 })
    wr.simulate('scroll', { deltaY: -100 })
  });



})
