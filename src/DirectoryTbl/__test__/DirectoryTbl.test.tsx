import React from 'react';
import {DirectoryTbl, IDirectoryTblProps} from './../DirectoryTbl';
import {ComboboxFldCell} from './../../ComboboxFld/ComboboxFldCell';
import {CheckboxFldCell} from './../../CheckboxFld/CheckboxFldCell';
import {StringFldCell} from './../../StringFld/StringFldCell';
import { shallow} from 'enzyme';
import { typeColumn } from '../../Grid/GridLayout';
import {GridLayout} from './../../Grid/GridLayout';
import {ItemsLayout} from './../../Grid/Items/ItemsLayout';
import {HeaderLayout} from './../../Grid/Header/HeaderLayout';
import {HeaderCellLayout} from './../../Grid/Header/HeaderCellLayout';
import {ToolbarLayout} from './../../Grid/Toolbar/ToolbarLayout'
import {RowLayout} from './../../Grid/Items/Table/RowLayout';
import {HeaderRowLayout} from './../../Grid/Header/HeaderRowLayout';
import {CellLayout} from './../../Grid/Items/Cell/CellLayout'
import {ImgButtonLayout} from './../../StringFld/ImgButtonLayout';
import {columns, items} from './setUp'

import {setUp} from './setUp';

describe('DirectoryTbl', () => {

  it('should created successfully', () => {
    const component = setUp();
    let gird = component.find(GridLayout);
    expect(gird).toHaveLength(1);
    // toolbar
    let toolbar = gird.dive().find(ToolbarLayout);
    expect(toolbar).toHaveLength(1);
    expect(toolbar.dive().find(ImgButtonLayout)).toHaveLength(3);
    
    //  header
    let header = gird.dive().find(HeaderLayout);
    expect(header).toHaveLength(1);
    expect(header.dive().find(HeaderRowLayout)).toHaveLength(1);
    let hRow = header.dive().find(HeaderRowLayout).dive().find(HeaderCellLayout);
    expect(hRow).toHaveLength(5);
    expect(hRow.at(0).dive().find(".st-grid-head-cell-textContainer").text()).toBe('№')

    //  items
    let items = gird.dive().find(ItemsLayout);
    expect(items).toHaveLength(1);
    expect(items.dive().find(RowLayout)).toHaveLength(3);
    //firts row
    let fr = items.dive().find(RowLayout).first().dive();
    expect(fr.find(CellLayout)).toHaveLength(5);
    expect(fr.find(CellLayout).at(0).dive().find(StringFldCell)).toHaveLength(1);
    expect(fr.find(CellLayout).at(3).dive().find(CheckboxFldCell)).toHaveLength(1);
    expect(fr.find(CellLayout).at(4).dive().find(ComboboxFldCell)).toHaveLength(1);
  });


  test('click add Btn', () => {
    const onChange =  jest.fn((items) => items)
    const component = shallow(<DirectoryTbl items={items} onChange={onChange} columns={columns} />);
    component.find(GridLayout).dive().find(ToolbarLayout).dive().find(ImgButtonLayout).at(0).dive().find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    //expect(onChange.mock.results[0].value).toBe('');
    //console.dir(component.find(GridLayout).dive().find(ItemsLayout).dive().debug());
    //console.dir(component.find(GridLayout).dive().find(ToolbarLayout).dive().find(ImgButtonLayout).at(0).dive().find('div').debug())
  })

  
 })
