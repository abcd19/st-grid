
import {ImgButtonLayout} from '../../StringFld/ImgButtonLayout'
import {onRemoveBtnClick, onAddBtnClick} from './DirectoryTblToolbarHandle'
import {IToolbarLayoutProps} from './../../Grid/Toolbar/ToolbarLayout'
import {DirectoryTbl} from './../DirectoryTbl';

// create toolbar
export const createDirectoryTableToolbar = ($this: DirectoryTbl): IToolbarLayoutProps =>
{
  const {addBtnFlag = true, 
    removeBtnFlag = true, removeAllBtnFlag = false, onRemoveAllItems = ()=>{/* do nothing  */}} = $this.props;
  
  $this.onRemoveBtnClick = onRemoveBtnClick.bind($this);
  $this.onAddBtnClick = onAddBtnClick.bind($this);

  const toolbar: IToolbarLayoutProps =  {items:[]};

  if(addBtnFlag === true)
  { 
    toolbar['items'].push({
      name: 'addItem',
      widthPix: 32,
      type: {
        constr: ImgButtonLayout,
        settings: { 
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