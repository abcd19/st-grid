

import * as ST from '../../../common.js'
import ReactDOM from 'react-dom';
import React from 'react';
import './Cell.css'
/**
 * Ячейка таблицы
 */
class CellLayout extends React.Component {
    
  /**
   * @constructor
   */
  constructor(props)
  {   
    super(props);
    this.props = props;
    this.background = '';
    this.display = '';
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);

    this._baseStyle = {
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      fontKerning: 'auto',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '12px', 
      textOverflow: 'ellipsis',
      boxSizing: 'border-box', 
      paddingLeft: '0px',
    }
  };

  onMouseDownItem()
  {
    if(ST.has(this.props, 'onMouseDownItem'))
    {
      this.props['onMouseDownItem'](this.props.alias);
    }
  }

  onChangeItem(val)
  {
    if(ST.has(this.props, 'onChangeItem'))
    {
      this.props['onChangeItem'](this.props.alias, val);
    }
  }

  render(){
      
      //определяем цвет
      let color = undefined;
      if(this.props.color != '')
      {
        color  = this.props.color;
      }
      
      //Если строка выделена, то создаем компонент
      let style = {
        width: this.props.widthPix+'px', //на ширину левого падднинга
        maxWidth: this.props.widthPix+'px', //на ширину левого падднинга
        display: this.props.display,
        background: color,
        ...this._baseStyle
      }
     
      if(this.props.layoutMode != 'edit')
      {
        style.overflow = 'hidden';
        style.paddingLeft = '2px';
      }


      

      let className = 'st-grid-body-cell ' + this.props.defaultColor;
      
      //создаем ячейку
      return (<this.props.type.constr 
          layoutMode = {this.props.layoutMode}
          style={style}  
          onChangeItem = {this.onChangeItem}
          onMouseDownItem = {this.onMouseDownItem} 
          val = {this.props.val} 
          settings = {this.props.type.settings}
          className={className} />)
    }

};

export {CellLayout}

