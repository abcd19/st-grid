
import * as ST from '../../common'
import {cloneData} from '../DirectoryTblFunctions'
import {sortItems, calcOriginal} from '../Sorting/sortItems';

//клик по кнопке удалить строку
export function onRemoveBtnClick(this: any)
{  
  if(ST.isNumber(this.state.selItemNum) == false)
  {
    return;
  }
  let newItems = cloneData(this.props.items);
  let  removedItem = ST.clone(newItems[ this.state.selItemNum ]);
  newItems.splice(this.state.selItemNum, 1);
  this.setState({selItemNum: undefined}, () => {
    
    if(ST.isFunction(this.props.onChange))
    {
      this.props.onChange(newItems, {event: 'removeItem', removedItem});
    }

    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem();
    }

  })
  
}


//клик по кнопке добавить строку
export function onAddBtnClick(this: any)
{
  let newItems = cloneData(this.props.items);
  newItems.push({ data: {}});  
  if(ST.isFunction(this.props.onChange))
  {
    this.props.onChange(newItems, {event: 'addItem'});
    this.setState({scrollToLastItem: true, selItemNum: newItems.length - 1}, () => {

      if(ST.isFunction(this.props.onSelectItem))
      {
        this.props.onSelectItem(this.props.items[ this.state.selItemNum ], this.state.selItemNum);
      }
      
      //отключем скрол вниз
      this.setState({scrollToLastItem: false},() => {
      });
    });
  }
}
