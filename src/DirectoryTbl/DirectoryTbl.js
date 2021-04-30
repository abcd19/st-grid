import React from 'react'
import {GridLayout} from './../Grid/GridLayout.tsx'
import {onChangeItem, onMouseDownItem, onClickHeaderCell} from './DirectoryTblHandle'
import {sortItems} from './Sorting/sortItems';
import * as ST from './../common'
import {createDirectoryTableToolbar} from './Toolbar/createDirectoryTableToolbar';

export class DirectoryTbl extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.onChangeItem = onChangeItem.bind(this);
    this.onMouseDownItem = onMouseDownItem.bind(this);
    this.onClickHeaderCell = onClickHeaderCell.bind(this);


    //создаем тулбар
    this.toolbar = createDirectoryTableToolbar(this);

    this.state = {
      selItemNum: undefined,
      sorting: undefined,
      scrollToLastItem: false,
    }

  }
  

  render()
  {
    let {height, width, columns, sortingFlag} = this.props;
    let {scrollToLastItem, sorting, selItemNum} = this.state;

    let items = this.props.items;
    // очищаем выбор
    for(const item of items)
    {
      item.color = undefined;
      item.layoutMode = 'view';
    }

    //если нужно пометить какую-либо строку как выбранную
    if(ST.isNumber(selItemNum))
    {

      if(ST.isObject(items[ selItemNum ]) )
      {
        //устанавливаем новую выбрнанную строку
        items[ selItemNum ].color = '#EDF5FC';
        items[ selItemNum ].layoutMode = 'edit';
      }

    }

    //сортируем
    if(ST.isObject(sorting) && ST.isString(sorting.order))
    {
      items = sortItems(ST.clone(items), sorting.cellAlias, sorting.order);
    }

    return <GridLayout   
      scrollToLastItem = {scrollToLastItem}
      width = {width} 
      height = {height} 
      onChangeItem = {this.onChangeItem}
      onMouseDownItem = {this.onMouseDownItem}
      onClickHeaderCell ={this.onClickHeaderCell}
      sortingFlag = {sortingFlag}
      toolbar = {this.toolbar}
      items = {items}
      columns = {columns}/>
  }
}