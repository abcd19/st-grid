import * as ST from './../common'
import {getItemByIndexRecursive} from './functions'


 //изменение значения в ячейке строки
export function onChangeItem(item, cellAlias, newVal)
{
  if(ST.isFunction(this.props.onChangeItem))
  {
    this.props.onChangeItem(item, cellAlias, newVal);
  }
}

 //клик правой кн мышки на строке
export function onMouseDownItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onMouseDownItem))
  {
    this.props.onMouseDownItem(item, cellAlias);
  }
}

export function onMouseLeaveItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onMouseLeaveItem))
  {
    this.props.onMouseLeaveItem(item, cellAlias);
  }
} 

/**
 * Дефолтный обработчик открытия вершины
 * @param {*} item 
 */
export function onOpenGroup(item)
{
  let {items} = this.state;
  item.link.isOpened = true;
  this.setState({items: items});
}

/**
 * Дефолтный обработчик закрытия вершины
 * @param {*} item 
 */
export function onCloseGroup(item)
{
  let {items} = this.state;
  item.link.isOpened = false;
  this.setState({items: items});
}

/**
 * Клик на заголовок
 */
export function onClickHeaderCell(alias, order)
{
  if(ST.isFunction(this.props.onClickHeaderCell))
  {
    this.props.onClickHeaderCell(alias, order);
  }
}

//двойной клик по вершине
export function onDoubleClickItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onDoubleClickItem))
  {
    this.props.onDoubleClickItem(item, cellAlias);
  }
}

export function onClickItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onClickItem))
  {
    this.props.onClickItem(item, cellAlias);
  }
}

//одинарный клик по вершине
export function onMouseEnterItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onMouseEnterItem))
  {
    this.props.onMouseEnterItem(item, cellAlias);
  }
}