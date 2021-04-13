import * as ST from './../../common'
import {getItemByIndex} from './../../Tree/functions'
import {cloneItems} from './DirectoryTreeFunctions'
import {calcOriginal} from './sortItems'


/**
 * Клик по заголовку ячейки
 * @param {string} alias 
 */
export function onClickHeaderCell(sortingCellAlias, orderSorting)
{ 

  let newSorting = {
    order: orderSorting,
    cellAlias: sortingCellAlias
  };

  this.setState({sorting: newSorting, selItemIndex: undefined}, () => {
    
    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem();
    }

  });

}


//нажали ЛКМ на вершине
export function onMouseDownItem(_item, cellAlias)
{
  let index = ST.clone(_item.index);

  let selItemIndex = index;
  if(ST.isObject(this.state.sorting) && ST.isString(this.state.sorting.order))
  {
    selItemIndex = calcOriginal(index, this.props.items, this.state.sorting.cellAlias, this.state.sorting.order);
  }

  let item = ST.clone(_item);
  
  this.setState({selItemIndex: index}, () => {
    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem(item, selItemIndex);
    }
  });

}

//изменилось значение в ячейке
export function onChangeItem(item, cellAlias, newVal)
{
  let newItems = cloneItems(this.props.items);
  let index = ST.clone(item.index);
  let selItemIndex = index;
  if(ST.isObject(this.state.sorting) && ST.isString(this.state.sorting.order))
  {
    selItemIndex = calcOriginal(index, newItems, this.state.sorting.cellAlias, this.state.sorting.order);
  }
  
  let changedItem = getItemByIndex(newItems, selItemIndex);
  changedItem['data'][cellAlias] = newVal;
  if(ST.isFunction(this.props.onChange))
  {
    this.props.onChange(newItems, {event: 'changeItem', selItemIndex, cellAlias, changedItem, newVal});
  }
}

export function onDoubleClickItem(item, cellAlias)
{

  if(ST.isFunction(this.props.onDoubleClickItemReplace))
  {
    this.props.onDoubleClickItemReplace(item, cellAlias);
    return;
  }

  if(ST.isFunction(this.props.onDoubleClickItem))
  {
    this.props.onDoubleClickItem(item, cellAlias);
  }
}
