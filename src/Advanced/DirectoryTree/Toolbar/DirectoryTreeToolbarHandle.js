import * as ST from './../../../common'


//клик по кнопке удалить строку
export function onRemoveBtnClick()
{
  if(ST.isFunction(this.props.onRemoveBtnClickReplace))
  {
    this.props.onRemoveBtnClickReplace();
    return;
  }

  
  if(ST.isFunction(this.props.onRemoveBtnClick))
  {
    this.props.onRemoveBtnClick();
  }
}

//поиск
export function onChangeSearchFld(text)
{
  let t = '';
  if(ST.isUndefined(text) || text === '')
  {
    t = undefined;
  }else{
    t = text;
  }

  this.setState({search: t, selItemIndex: undefined}, () => {
    
    if(ST.isFunction(this.props.onSelectItem))
    {
      this.props.onSelectItem();
    }

  });

}
