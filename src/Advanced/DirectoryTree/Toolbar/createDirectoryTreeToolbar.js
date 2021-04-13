

import {ImgButtonLayout} from '../../../StringFld/ImgButtonLayout'
import {SearchFldLayoutEdit} from '../../../ComboboxFld/SearchFldLayoutEdit'
import { onRemoveBtnClick, onChangeSearchFld} from './DirectoryTreeToolbarHandle'
  

//создать тулбар для дерева
export const createDirectoryTreeToolbar = ($this) =>
{

  //клик по кнопке удалить
  $this.onRemoveBtnClick = onRemoveBtnClick.bind($this);
  //изменен текст поиска
  $this.onChangeSearchFld = onChangeSearchFld.bind($this);
  //Добавление новой вершины (не группы)
  //$this.addBtnClick = addBtnClick.bind($this);
  //Добавление новой группы
  //$this.addGroupBtnGroupClick = addGroupBtnClick.bind($this);

  let {addBtnFlag, removeBtnFlag, searchFldFlag} = $this.props;
  
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
          handler:{
            click: () =>{},
          }
        }
      }
    });

    toolbar['items'].push({
      name: 'addGroup',
      widthPix: 32,
      type: {
        constr: ImgButtonLayout,
        settings: { 
          size: 32,
          imageName: 'plusFolder',
          handler:{
            click: () =>{},
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
          size: 32,
          handler:{
            click: $this.onRemoveBtnClick,
          }
        }
      }
    });
  }

    if(searchFldFlag === true)
    {
      toolbar['items'].push({
      name: 'search',
      widthPix: 250,
      type: {
        constr: SearchFldLayoutEdit,
        settings: { 
          onChangeDelay: $this.onChangeSearchFld,
          onSearchBtnClick:  $this.onChangeSearchFld
        }
      }
    })
  }

  return toolbar;
}