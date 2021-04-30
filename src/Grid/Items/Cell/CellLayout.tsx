

import * as ST from '../../../common.js'
import React from 'react';
import './Cell.scss'

export interface ICellLayoutProps {
  onMouseEnterItem: (alias: string) => void,
  onMouseLeaveItem: (alias: string) => void,
  onMouseDownItem: (alias: string) => void,
  onChangeItem: any,
  color: any,
  widthPix: number,
  onDoubleClickItem: any,
  onClickItem: any,
  val: any,
  rowItem: any,
  rowNum: number,
  type: any,
  alias: string,
  display?: any,
  defaultColor: any,
  layoutMode: string
 }


// cell of the table
class CellLayout extends React.Component<ICellLayoutProps> {

  private background: string;
  private display: string;
  private _baseStyle: React.CSSProperties;

  constructor(props: ICellLayoutProps) {
    super(props);
    this.background = '';
    this.display = '';
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);

    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);
    this.onDoubleClickItem = this.onDoubleClickItem.bind(this);
    this.onClickItem = this.onClickItem.bind(this);

    this._baseStyle = {
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      fontKerning: 'auto',
      fontFamily: '"Tahoma", Helvetica, Arial, sans-serif',
      fontSize: '10pt',
      textOverflow: 'ellipsis',
      boxSizing: 'border-box',
      paddingLeft: '0px',
    }
  };

  onMouseEnterItem() {
    if (ST.has(this.props, 'onMouseEnterItem')) {
      this.props['onMouseEnterItem'](this.props.alias);
    }
  }

  onMouseLeaveItem() {
    if (ST.has(this.props, 'onMouseLeaveItem')) {
      this.props['onMouseLeaveItem'](this.props.alias);
    }
  }

  onMouseDownItem() {
    if (ST.has(this.props, 'onMouseDownItem')) {
      this.props['onMouseDownItem'](this.props.alias);
    }
  }

  onChangeItem(val: any) {
    if (ST.has(this.props, 'onChangeItem')) {
      this.props['onChangeItem'](this.props.alias, val);
    }
  }

  onDoubleClickItem() {
    if (ST.has(this.props, 'onDoubleClickItem')) {
      this.props['onDoubleClickItem'](this.props.alias);
    }
  }

  onClickItem() {
    if (ST.has(this.props, 'onClickItem')) {
      this.props['onClickItem'](this.props.alias);
    }
  }

  render() {

    //определяем цвет
    let color = undefined;
    if (this.props.color != '') {
      color = this.props.color;
    }

    //Если строка выделена, то создаем компонент
    let style = {
      width: this.props.widthPix + 'px', //на ширину левого падднинга
      maxWidth: this.props.widthPix + 'px', //на ширину левого падднинга
      display: this.props.display,
      background: color,
      ...this._baseStyle
    }

    if (this.props.layoutMode != 'edit') {
      style.overflow = 'hidden';
      style.paddingLeft = '5px';
    }




    let className = 'st-grid-body-cell ' + this.props.defaultColor;

    //создаем ячейку
    return (<this.props.type.constr
      layoutMode={this.props.layoutMode}
      style={style}
      widthPix={this.props.widthPix}
      onChangeItem={this.onChangeItem}
      onMouseDownItem={this.onMouseDownItem}
      onMouseLeaveItem={this.onMouseLeaveItem}
      onMouseEnterItem={this.onMouseEnterItem}
      onDoubleClickItem={this.onDoubleClickItem}
      onClickItem={this.onClickItem}
      rowItem={this.props.rowItem}
      val={this.props.val}
      settings={this.props.type.settings}
      className={className} />)
  }

};

export { CellLayout }

