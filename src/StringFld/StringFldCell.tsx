import React from 'react';
import {StringFldLayoutEdit, IStringFldLayoutEditProps, typeStringFldVal, typeStringFldOnChange} from './StringFldLayoutEdit';


export interface IFldCellProps<typeOnChange, typeVal, typeSettings> {
  layoutMode: string; 
  style: React.CSSProperties;
  onMouseDownItem: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  onChangeItem: typeOnChange;
  className: string; 
  val: typeVal;
  settings: typeSettings
}

export interface IStringFldCellProps extends IFldCellProps<typeStringFldOnChange, typeStringFldVal, IStringFldLayoutEditProps>{}


export const StringFldCell : React.FC<IStringFldCellProps> = (
  {layoutMode, style, onMouseDownItem, onChangeItem, className, val}: IStringFldCellProps) =>
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

