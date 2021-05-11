import * as ST from '../common';
import React from 'react';
import {StringFldLayoutEdit} from './StringFldLayoutEdit';

export interface StringFldCellProps {
  layoutMode: string; 
  style: React.CSSProperties;
  onMouseDownItem: () => void;
  onChangeItem: () => void;
  className: string; 
  val: string | undefined;
  onMouseEnterItem: () => void;
  onDoubleClickItem: () => void;
  onMouseLeaveItem: () => void;
  onClickItem: () => void;
}

export const StringFldCell : React.FC<StringFldCellProps> = (
  {layoutMode, style, onMouseDownItem, onChangeItem, className, val,
      onMouseEnterItem, onDoubleClickItem, onMouseLeaveItem, onClickItem}: StringFldCellProps) =>
{
 
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onClick = {onClickItem} onDoubleClick = {onDoubleClickItem} onMouseDown = {onMouseDownItem} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem}   className={className}>
            <StringFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }
     
  return (
      <td  style={style} onClick = {onClickItem} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem} onDoubleClick = {onDoubleClickItem}  onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  )
  
}

