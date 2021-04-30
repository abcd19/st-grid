
import * as ST from '../common'
import {cloneData} from './DirectoryTblFunctions'
import {calcOriginal} from './Sorting/sortItems'

//изменение айтема
export function onChangeItem(this: any, item: any, cellAlias: string, newVal: any)
{
  
  let newItems = cloneData(this.props.items);
  let selNum = item.rowNum;
  
  if(ST.isObject(this.state.sorting) && ST.isString(this.state.sorting.order))
  {
    let selItemNumLink = calcOriginal(item.rowNum, newItems, this.state.sorting.cellAlias, this.state.sorting.order);
    selNum = selItemNumLink;
  }

  newItems[selNum].data[cellAlias] = newVal;

  if(ST.isFunction(this.props.onChange))
  {
    this.props.onChange(newItems, {event: 'changeItem', selItemNum: selNum, cellAlias, newVal});
  }
}

/**
 * Клик по заголовку ячейки
 */
export function onClickHeaderCell(this: any, sortingCellAlias: string, orderSorting: string)
{ 
  let newSorting = {
    order: orderSorting,
    cellAlias: sortingCellAlias
  };

  this.setState({sorting: newSorting, selItemNum: undefined}, () => {
    
    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem();
    }

  });
}


// клик по строке
export function onMouseDownItem(this: any, item: any, cellAlias: string)
{
  let selNum = item.rowNum;
  if(ST.isObject(this.state.sorting) && ST.isString(this.state.sorting.order))
  {
    let selItemNumLink = calcOriginal(item.rowNum, this.props.items, this.state.sorting.cellAlias, this.state.sorting.order);
    selNum = selItemNumLink;
  }
  this.setState({selItemNum: selNum},() => {
    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem(this.props.items[ this.state.selItemNum ], this.state.selItemNum);
    }
  })

}