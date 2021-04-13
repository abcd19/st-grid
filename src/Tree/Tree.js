import * as ST from './../common'
import React from 'react';
import {GridLayout} from './../Grid/GridLayout';
import {onChangeItem, onMouseDownItem,
   onClickHeaderCell, onClickItem, 
   onMouseEnterItem, onMouseLeaveItem, onDoubleClickItem,
   onOpenGroup, onCloseGroup} from './TreeHandle'


/**
 * Шаблон для таблицы
 */
export class Tree extends React.Component {
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);

    this.props = props;
    

    this.state = {
      scrollToLastItem: false,
    };

    this.selItemNum = undefined;

    this.columns = this.props.columns;

    //дефолтные обработчики
    ST.defaults(this.columns[0]['type']['settings'], {
      onOpenGroup: onOpenGroup.bind(this),
      onCloseGroup: onCloseGroup.bind(this)
    });

    //пр кн мышки на строке
    this.onMouseDownItem = onMouseDownItem.bind(this);
    //изменение значения в ячейке строки
    this.onChangeItem = onChangeItem.bind(this);
    //курсор перешел на элемент
    this.onMouseEnterItem = onMouseEnterItem.bind(this);
    //курсор покинул элемент
    this.onMouseLeaveItem = onMouseLeaveItem.bind(this);
    //прокрутка до последней строки завершена
    this.scrollToLastItemHandle = this.scrollToLastItemHandle.bind(this);
    //клик по заголовку
    this.onClickHeaderCell = onClickHeaderCell.bind(this);
    //двойной клик по айтему
    this.onDoubleClickItem = onDoubleClickItem.bind(this);
    //одинарный клик по айтему
    this.onClickItem = onClickItem.bind(this);

    this.toolbar =  props.toolbar;
  };


  //todo переделать. убрать этот хендл
  scrollToLastItemHandle(on)
  {
    this.setState({
      scrollToLastItem: on
    });
  }

  //строиит из иерархического линейное представление 
  buildItemLinearRecursive(items, nodeChildren, nodeIndex, deep = 0)
  {
      nodeChildren.forEach((child, i, array) =>{
        let newNodeIndex = [...nodeIndex];
        newNodeIndex.push(i);
        let newItem = {
          data: child['data'],
          deep: deep,
          link: child,
          color: child['color'],
          index: newNodeIndex
        };
        
        items.push(newItem);

       if(child['children'] && child['isGroup'] === true && child['isOpened'] === true && child['children'].length > 0)
        {
          this.buildItemLinearRecursive(items, child['children'], newNodeIndex,  deep + 1)
        }

      });
  }

  calcSelNumByIndex(linearItems, selIndex)
  {
    function isSameIndex(row1, row2)
    {
      if(ST.isArray(row1) == false || ST.isArray(row2) == false)
      {
        return false
      };

      if(row1.length != row2.length)
      {
        return false;
      }

      for(let i = 0; i < row1.length; i++)
      {
        if(row1[i] != row2[i])
        {
          return false;
        }
      }

      return true;
    }
    
    for(let i = 0; i < linearItems.length; i++)
    {
      if(isSameIndex(linearItems[i].index, selIndex))
      {
        return linearItems[i].rowNum
      } 
    }
    return undefined;
  }



  render()
  {    
    //console.log('render')
    let {items, width, height, selIndex} = this.props; 
    
    //массив с линейным расположением строк
    let linearItems = [];
    this.buildItemLinearRecursive(linearItems, items, []);
         
    for(let i = 0; i < linearItems.length; i++)
    {
      linearItems[i].rowNum = i;
    }

    let selItemNum = this.calcSelNumByIndex(linearItems, selIndex);
    
    //если нужно пометить какую-либо строку как выбранную
    if(ST.isNumber(selItemNum))
    {
      //если до этого была выбранная строка
      //снимаем выбор
      if(ST.isNumber(this.selItemNum)&& ST.isObject(linearItems[ this.selItemNum  ]))
      {
        linearItems[ this.selItemNum  ].color = undefined;
        linearItems[ this.selItemNum  ].layoutMode = 'view';
      }

      if(ST.isObject(linearItems[selItemNum]))
      {
        //устанавливаем новую выбрнанную строку
        this.selItemNum = selItemNum;
        linearItems[selItemNum].color = '#EDF5FC';
        linearItems[selItemNum].layoutMode = 'edit';
      }

    }else{

      //если не нужно помечать, то снимае выбор, при наличии
      if(ST.isNumber(this.selItemNum) && ST.isObject(linearItems[ this.selItemNum  ]))
      {
        linearItems[ this.selItemNum  ].color = undefined;
        linearItems[ this.selItemNum  ].layoutMode = 'view';
      }
    }

    
    return(<GridLayout
      scrollToLastItem = {this.state.scrollToLastItem}  
      scrollToLastItemHandle = {this.scrollToLastItemHandle}  
      width = {width} 
      height = {height} 
      sortingFlag = {this.props.sortingFlag}
      onClickHeaderCell ={this.onClickHeaderCell}
      onChangeItem = {this.onChangeItem}
      onMouseDownItem = {this.onMouseDownItem}
      onMouseEnterItem = {this.onMouseEnterItem}
      onMouseLeaveItem = {this.onMouseLeaveItem}
      onDoubleClickItem = {this.onDoubleClickItem}
      toolbar = {this.toolbar}
      items = {linearItems}
      columns = {this.columns}/>)
  }

}

Tree.defaultProps = {
  'items': [],
  'columns': [],
  'width': 450,
  'height': 600
}

export {getItemByIndex}  from './functions'