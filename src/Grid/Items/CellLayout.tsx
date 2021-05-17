import React from 'react';
import css from './Cell.scss';
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
      this.props['onMouseEnterItem'](this.props.alias);
  }

  onMouseLeaveItem(): void {
      this.props['onMouseLeaveItem'](this.props.alias);
  }

  onMouseDownItem(): void {
      this.props['onMouseDownItem'](this.props.alias);
  }

  onChangeItem(/*cellAlias: string,*/ val: tyepCellVal): void {
      this.props['onChangeItem'](this.props.alias, val);
  }

  onDoubleClickItem(/*cellAlias: string*/): void {
      this.props['onDoubleClickItem'](this.props.alias);
  }

  onClickItem(/*cellAlias: string*/): void {
      this.props['onClickItem'](this.props.alias);
  }

  render(): React.ReactElement {

    const {color = '', widthPix, display, layoutMode, defaultColor, rowItem, val} = this.props;
    
    //If the line is selected, then create a component
    const style = {
      width: widthPix + 'px', //на ширину левого падднинга
      maxWidth: widthPix + 'px', //на ширину левого падднинга
      display: display,
      background: color,
      ...this._baseStyle
    }

    if (layoutMode != 'edit') {
      style.overflow = 'hidden';
      style.paddingLeft = '5px';
    }




    const className = `${css.bodyCell} ` + defaultColor;

    //создаем ячейку
    return (<this.props.type.constr
      layoutMode={layoutMode}
      style={style}
      widthPix={widthPix}
      onChangeItem={this.onChangeItem}
      onMouseDownItem={this.onMouseDownItem}
      onMouseLeaveItem={this.onMouseLeaveItem}
      onMouseEnterItem={this.onMouseEnterItem}
      onDoubleClickItem={this.onDoubleClickItem}
      onClickItem={this.onClickItem}
      rowItem={rowItem}
      val={val}
      settings={this.props.type.settings}
      className={className} />)
  }

}

export { CellLayout }

