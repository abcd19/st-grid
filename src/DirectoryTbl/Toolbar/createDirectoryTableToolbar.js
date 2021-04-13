
import {ImgButtonLayout} from '../../StringFld/ImgButtonLayout'
import {onRemoveBtnClick, onAddBtnClick} from './DirectoryTblToolbarHandle'

//создать тулбар для дерева
export const createDirectoryTableToolbar = ($this) =>
{
  let {addBtnFlag, removeBtnFlag, searchFldFlag, removeAllBtnFlag, onRemoveAllItems} = $this.props;
  
  $this.onRemoveBtnClick = onRemoveBtnClick.bind($this);
  $this.onAddBtnClick = onAddBtnClick.bind($this);

  let toolbar =  {items:[]};

  if(addBtnFlag === true)
  { 
    toolbar['items'].push({
      name: 'addItem',
      widthPix: 32,
      type: {
        constr: ImgButtonLayout,
        settings: { 
          size: 32,
          imageName: 'plus',
          title: 'Добавить',
          handler:{
            click: $this.onAddBtnClick,
          }
        }
      }
    });
  }

  if(removeBtnFlag === true)
  {
    toolbar['items'].push({
      name: 'del',
      widthPix: 32,
      type: {
        constr: ImgButtonLayout,
        settings: { 
          imageName: 'remove',
          title: 'Удалить',
          size: 32,
          handler:{
            click: $this.onRemoveBtnClick,
          }
        }
      }
    });
  }
  
  if(removeAllBtnFlag === true)
  {
    toolbar['items'].push({
      name: 'delAll',
      widthPix: 32,
      type: {
        constr: ImgButtonLayout,
        settings: { 
          title: 'Удалить всё',
          imageName: 'removeAll',
          size: 32,
          handler:{
            click: onRemoveAllItems,
          }
        }
      }
    });
  }

  return toolbar;

  /*
  if(searchFldFlag === true)
  {
    toolbar['items'].push({
    name: 'search',
    widthPix: 250,
    type: {
      constr: SearchFldLayoutEdit,
      settings: { 
        onChangeDelay: (val)  => {

          if(ST.isFunction(this.props.onChangeSearchFld))
          {
            this.props.onChangeSearchFld(val)
          }

        },
        onSearchBtnClick:  (val) =>{
          if(ST.isFunction(this.props.onChangeSearchFld))
          {
            this.props.onChangeSearchFld(val)
          }
        }
      }
    }
  })
  }*/
}