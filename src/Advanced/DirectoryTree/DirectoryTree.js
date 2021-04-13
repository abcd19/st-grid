
import * as ST from './../../common'
import React from 'react';
import {Tree} from './../../Tree/Tree'
import {onMouseDownItem, onClickHeaderCell, onChangeItem, onDoubleClickItem} from './DirectoryTreeHandle'
import {sortItems} from './sortItems'
import {searchItems} from './searchItems'
import {createDirectoryTreeToolbar} from './Toolbar/createDirectoryTreeToolbar'


export class DirectoryTree extends React.Component 
{
  constructor(props)
  {
    super(props);
    //создаем тулбар
    this.toolbar = createDirectoryTreeToolbar(this);
    this.onMouseDownItem = onMouseDownItem.bind(this);
    this.onClickHeaderCell = onClickHeaderCell.bind(this);
    this.onDoubleClickItem = onDoubleClickItem.bind(this);
    this.onChangeItem = onChangeItem.bind(this);
    this.state = {
      selItemIndex:  undefined,
      search: undefined,
      sorting: undefined
    }
  }
  
  render()
  {
    let {height, width, columns, sortingFlag} = this.props;
    let {sorting, search, selItemIndex} = this.state;
    
    let items;
    if(ST.isObject(sorting) && ST.isString(sorting.order))
    {
      items = sortItems(ST.clone(this.props.items), sorting.cellAlias, sorting.order);
    }else{
      items = this.props.items;
    }

    if(ST.isString(search))
    {
      items = searchItems(ST.clone(items), search)
    }

    return (<Tree   
              height = {height}
              width = {width}
              onMouseDownItem = {this.onMouseDownItem}
              onChangeItem = {this.onChangeItem}
              onDoubleClickItem = {this.onDoubleClickItem}
              onClickHeaderCell = {this.onClickHeaderCell}
              selIndex = {selItemIndex}
              toolbar = {this.toolbar}
              sortingFlag = {sortingFlag}
              columns = {columns}
              items = { items} 
            />)
  }

}