
import * as ST from '../common'
import {cloneData} from './DirectoryTblFunctions'
import {calcOriginal} from './Sorting/sortItems'
import {DirectoryTbl} from './DirectoryTbl';
import {typeItem} from './../Grid/GridLayout';
import {tyepCellVal} from './../Grid/Items/Cell/CellLayout';

//change item
export function onChangeItem(this: DirectoryTbl, item: typeItem, cellAlias: string, newVal: tyepCellVal): void
{
  
  const newItems = cloneData(this.props.items);
  let selNum = item.rowNum;
  
  if(this.state.sorting && ST.isString(this.state.sorting.order))
  {
    const selItemNumLink = calcOriginal(item.rowNum, newItems, this.state.sorting.cellAlias, this.state.sorting.order);
    if(selItemNumLink)
    {
      selNum = selItemNumLink;
    }
    
  }
  if(typeof(selNum) == 'number')
  {
    newItems[selNum].data[cellAlias] = newVal;
  }
  

  if(ST.isFunction(this.props.onChange))
  {
    this.props.onChange(newItems, {event: 'changeItem', selItemNum: selNum, cellAlias, newVal});
  }
}

// click header cell
export function onClickHeaderCell(this: DirectoryTbl, sortingCellAlias: string, orderSorting?: string): void
{ 
  const newSorting = {
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
export function onMouseDownItem(this: DirectoryTbl, item: typeItem /*, cellAlias: string*/): void
{
  let selNum = item.rowNum;
  if(this.state.sorting && ST.isString(this.state.sorting.order))
  {
    const selItemNumLink = calcOriginal(item.rowNum, this.props.items, this.state.sorting.cellAlias, this.state.sorting.order);
    if(selItemNumLink)
    {
      selNum = selItemNumLink;
    }
    
  }
  this.setState({selItemNum: selNum},() => {
    if(ST.isFunction(this.props.onSelectItem))
    {
      if(typeof(this.state.selItemNum) == 'number')
      {
        this.props.onSelectItem(this.props.items[ this.state.selItemNum ], this.state.selItemNum);
      }
      
    }
  })

}