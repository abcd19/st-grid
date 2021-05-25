
import * as ST from '../common'
import {cloneData} from './DirectoryTblFunctions'
import {DirectoryTbl} from './DirectoryTbl';
import {typeItem} from './Grid/GridLayout';
import {tyepCellVal} from './Grid/Items/CellLayout';

//change item
export function onChangeItem(this: DirectoryTbl, item: typeItem, cellAlias: string, newVal: tyepCellVal): void
{
  const { items } = this.props;
  const newItems = cloneData(items as typeItem[]);
  const selNum = item.rowNum;
  

  if(typeof(selNum) == 'number')
  {
    newItems[selNum].data[cellAlias] = newVal;
  }
  

  if(this.props.onChange)
  {
    this.props.onChange(newItems, {event: 'changeItem', selItemNum: selNum, cellAlias, newVal});
  }
}

// click header cell
export function onClickHeaderCell(this: DirectoryTbl, sortingCellAlias: string, orderSorting?: string): void
{ 
  
}


// клик по строке
export function onMouseDownItem(this: DirectoryTbl, item: typeItem /*, cellAlias: string*/): void
{
  const selNum = item.rowNum;
  
  this.setState({selItemNum: selNum},() => {
    const items = this.props.items as typeItem[];
    if(this.props.onSelectItem)
    {
      if(typeof(this.state.selItemNum) == 'number')
      {
        this.props.onSelectItem(items[ this.state.selItemNum ], this.state.selItemNum);
      }
      
    }
  })

}