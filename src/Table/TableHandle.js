import * as ST from './../common'


 //изменение значения в ячейке строки
export function onChangeItem(item, cellAlias, newVal)
{
  if(ST.isFunction(this.props.onChangeItem))
  {
    this.props.onChangeItem(item.rowNum, cellAlias, newVal);
  }
}

 //клик правой кн мышки на строке
export function onMouseDownItem(item, cellAlias)
{
  if(ST.isFunction(this.props.onMouseDownItem))
  {
    this.props.onMouseDownItem(item.rowNum, cellAlias);
  }
}

//клик по кнопке удалить строку
export function removeBtnClickHandle()
{
  if(ST.isFunction(this.props.onRemoveItem))
  {
    this.props.onRemoveItem(this.selItemNum);
  }
  
  this.selItemNum = undefined;
}

//клик по кнопке добавить строку
export function addBtnClickHandle()
{
    //создаем пустую строку
    let newItem = {
      color : undefined,
      layoutMode: 'view',
      data: {
      }
    };

    if(ST.isFunction(this.props.onAddItem))
    {
      this.props.onAddItem(newItem);
    }
    

    //перерисовываем строки скроллим до последний строки
    this.setState({
      scrollToLastItem: true
    });
    
}