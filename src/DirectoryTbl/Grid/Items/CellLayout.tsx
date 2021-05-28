import React, { CSSProperties } from 'react';
import css from './Cell.scss';
import {typeStringFldVal} from './../../../StringFld/StringFldLayoutEdit';
import {typeComboValue} from './../../../ComboboxFld';
import {typeCheckboxFldVal} from './../../../CheckboxFld/CheckboxFldLayoutEdit'
import { typeItem, TGridColumnType } from './../GridLayout'
export type tyepCellVal = typeStringFldVal | typeComboValue |  typeCheckboxFldVal; 


export interface ICellLayoutProps {
  onMouseDownItem: (alias: string) => void,
  onChangeItem: (cellAlias: string, val: tyepCellVal) => void,
  color?: string,
  widthPix: number,
  val: tyepCellVal,
  rowItem: typeItem,
  rowNum: number,
  type: TGridColumnType,
  alias: string,
  display?: string,
  defaultColor: string,
  layoutMode?: string
 }


// cell of the table
export const CellLayout : React.FC<ICellLayoutProps> = (props: ICellLayoutProps) => {

  const {color = '', widthPix, display, layoutMode, defaultColor, rowItem, val} = props;
    
  //If the line is selected, then create a component
  const style: CSSProperties = {
    width: `${widthPix}px`, 
    maxWidth: `${widthPix}px`, 
    display: display,
    background: color,
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
    fontKerning: 'auto',
    fontFamily: '"Tahoma", Helvetica, Arial, sans-serif',
    fontSize: '10pt',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    paddingLeft: '0px',
  }

  if (layoutMode != 'edit') {
    style.overflow = 'hidden';
    style.paddingLeft = '5px';
  }

  const onMouseDownItem = (): void => {
    props['onMouseDownItem'](props.alias);
  };

  const onChangeItem = (/*cellAlias: string,*/ val: tyepCellVal): void => {
    props['onChangeItem'](props.alias, val);
  };


  return (<props.type.constr
    layoutMode={layoutMode}
    style={style}
    widthPix={widthPix}
    onChangeItem={onChangeItem}
    onMouseDownItem={onMouseDownItem}
    rowItem={rowItem}
    val={val}
    settings={props.type.settings}
    className={`${css.bodyCell} ` + defaultColor} />)
}