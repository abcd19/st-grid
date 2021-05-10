

import * as ST from '../../common.js'
import React from 'react';
import './Cell.scss';
import {tyepStringFldVal} from './../../StringFld/StringFldLayoutEdit';
import {typeComboValue} from './../../ComboboxFld/ListLayout';
import {tyepCheckboxFldVal} from './../../CheckboxFld/CheckboxFldLayoutEdit'
import { typeItem, typeTypeColumn } from './../GridLayout'
export type tyepCellVal = tyepStringFldVal | typeComboValue |  tyepCheckboxFldVal; 


export interface ICellLayoutProps {
  onMouseEnterItem: (alias: string) => void,
  onMouseLeaveItem: (alias: string) => void,
  onMouseDownItem: (alias: string) => void,
  onChangeItem: (cellAlias: string, val: tyepCellVal) => void,
  color?: string,
  widthPix: number,
  onDoubleClickItem: (cellAlias: string)=>void,
  onClickItem: (cellAlias: string) => void,
  val: tyepCellVal,
  rowItem: typeItem,
  rowNum: number,
  type: typeTypeColumn,
  alias: string,
  display?: string,
  defaultColor: string,
  layoutMode?: string
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
  }

  onMouseEnterItem(): void {
    if (ST.has(this.props, 'onMouseEnterItem')) {
      this.props['onMouseEnterItem'](this.props.alias);
    }
  }

  onMouseLeaveItem(): void {
    if (ST.has(this.props, 'onMouseLeaveItem')) {
      this.props['onMouseLeaveItem'](this.props.alias);
    }
  }

  onMouseDownItem(): void {
    if (ST.has(this.props, 'onMouseDownItem')) {
      this.props['onMouseDownItem'](this.props.alias);
    }
  }

  onChangeItem(/*cellAlias: string,*/ val: tyepCellVal): void {
    if (ST.has(this.props, 'onChangeItem')) {
      this.props['onChangeItem'](this.props.alias, val);
    }
  }

  onDoubleClickItem(/*cellAlias: string*/): void {
    if (ST.has(this.props, 'onDoubleClickItem')) {
      this.props['onDoubleClickItem'](this.props.alias);
    }
  }

  onClickItem(/*cellAlias: string*/): void {
    if (ST.has(this.props, 'onClickItem')) {
      this.props['onClickItem'](this.props.alias);
    }
  }

  render(): React.ReactElement {

    //определяем цвет
    let color = undefined;
    if (this.props.color != '') {
      color = this.props.color;
    }

    //Если строка выделена, то создаем компонент
    const style = {
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




    const className = 'st-grid-body-cell ' + this.props.defaultColor;

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

}

export { CellLayout }

