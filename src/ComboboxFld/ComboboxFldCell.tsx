import * as ST from '../common';
import React, { CSSProperties } from 'react';
import {ComboboxFldLayoutEdit} from './ComboboxFldLayoutEdit';


export interface IComboboxFldCellProps {
  layoutMode: string;
  style: CSSProperties; 
  onMouseDownItem: any;
  onChangeItem: any;
  className: any;
  val: any;
  settings: any;
}

export const ComboboxFldCell: React.FC<IComboboxFldCellProps> = (props: IComboboxFldCellProps) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings} = props;
  const{listWidthPix, items,  clearBtnFlag} = settings;
  
  if(layoutMode == 'edit')
  {
    
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <ComboboxFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} listWidthPix={listWidthPix} clearBtnFlag={clearBtnFlag} val = {val} items = {items} />
        </td>
      );
  }


  if(ST.has(val, 'display'))
  {
    
    val = val['display'];
  }else{
    val = '';
  }

  return (
    <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  );
  
}

