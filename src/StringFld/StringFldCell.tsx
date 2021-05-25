import React from 'react';
import {StringFldLayoutEdit, IStringFldLayoutEditProps, typeStringFldVal, typeStringFldOnChange} from './StringFldLayoutEdit';

export interface StringFldCellProps {
  layoutMode: string; 
  style: React.CSSProperties;
  onMouseDownItem: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  onChangeItem: typeStringFldOnChange;
  className: string; 
  val: typeStringFldVal;
  settings?: IStringFldLayoutEditProps
}

export const StringFldCell : React.FC<StringFldCellProps> = (
  {layoutMode, style, onMouseDownItem, onChangeItem, className, val}: StringFldCellProps) =>
{
 
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem} className={className}>
            <StringFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }
     
  return (
      <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  )
  
}

