import * as ST from './../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {GridLayout} from './../Grid/GridLayout'
import {onChangeItem, onMouseDownItem, removeBtnClickHandle, addBtnClickHandle} from './TableHandle'


/**
 * Шаблон для таблицы
 */
export class Table extends React.Component {
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);

    this.props = props;

    this.state = {
      scrollToLastItem: false
    };

    //номер выбранной строки
    this.selItemNum = undefined;
    //Удаление строки
    this.removeBtnClickHandle = removeBtnClickHandle.bind(this);
    //Добавление строки
    this.addBtnClickHandle = addBtnClickHandle.bind(this);
    //пр кн мышки на строке
    this.onMouseDownItem = onMouseDownItem.bind(this);
    //изменение значения в ячейке строки
    this.onChangeItem = onChangeItem.bind(this);

    //прокрутка до последней строки завершена
    this.scrollToLastItemHandle = this.scrollToLastItemHandle.bind(this);

    this.toolbar =  {
      items:[
        {
          name: 'add',
          widthPix: 32,
          type: {
            constr: 'ImgButtonLayout',
            settings: { 
              size: 32,
              imageName: 'plus',
              handler:{
                click: this.addBtnClickHandle,
              }
            }
          }
        },
      {
        name: 'del',
        widthPix: 32,
        type: {
          constr: 'ImgButtonLayout',
          settings: { 
            imageName: 'remove',
            size: 32,
            handler:{
              click: this.removeBtnClickHandle,
            }
          }
        }
      }
    ]};

  };


  //todo переделать. убрать этот хендл
  scrollToLastItemHandle(on)
  {
    this.setState({
      scrollToLastItem: on
    });
  }

  render()
  {
    
    const {width, height, items, columns, selItemNum} = this.props;
    
    //если нужно пометить какую-либо строку как выбранную
    if(ST.isNumber(selItemNum))
    {
      //если до этого была выбранная строка
      //снимаем выбор
      if(ST.isNumber(this.selItemNum))
      {
        items[ this.selItemNum  ].color = undefined;
        items[ this.selItemNum  ].layoutMode = 'view';
      }

      if(ST.isObject(items[selItemNum]))
      {
        //устанавливаем новую выбрнанную строку
        this.selItemNum = selItemNum;
        items[selItemNum].color = '#EDF5FC';
        items[selItemNum].layoutMode = 'edit';
      }

    }else{

      //если не нужно помечать, то снимае выбор, при наличии
      if(ST.isNumber(this.selItemNum))
      {
        items[ this.selItemNum  ].color = undefined;
        items[ this.selItemNum  ].layoutMode = 'view';
      }
    }

    return(<GridLayout   
      scrollToLastItem = {this.state.scrollToLastItem}  
      scrollToLastItemHandle = {this.scrollToLastItemHandle}  
      width = {width} 
      height = {height} 
      onChangeItem = {this.onChangeItem}
      onMouseDownItem = {this.onMouseDownItem}
      toolbar = {this.toolbar}
      items = {items}
      columns = {columns}/>)
  }

}