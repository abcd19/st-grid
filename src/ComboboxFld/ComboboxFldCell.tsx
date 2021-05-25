import React, { CSSProperties } from 'react';
import {ComboboxFldLayoutEdit, IComboboxFldLayoutEditProps} from './ComboboxFldLayoutEdit';
import {typeComboValue, typeComboOnChange} from './ComboboxFldLayoutEdit'

export interface IComboboxFldCellProps {
  layoutMode?: string;
  style?: CSSProperties; 
  onMouseDownItem?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  onChangeItem?: typeComboOnChange;
  className?: string;
  val?: typeComboValue;
  settings: IComboboxFldLayoutEditProps;
}

export const ComboboxFldCell: React.FC<IComboboxFldCellProps> = (props: IComboboxFldCellProps) =>
{
  const {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings} = props;

  const {listWidthPix, items,  clearBtnFlag} = settings;
  
  if(layoutMode == 'edit')
  {
    
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <ComboboxFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} listWidthPix={listWidthPix} clearBtnFlag={clearBtnFlag} val = {val} items = {items} />
        </td>
      );
  }

  let valTemp: string | number | boolean | typeComboValue = '';
  if(val && typeof val == 'object' && val.display)
  {
    valTemp = val.display;
  }

  return (
    <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { valTemp }</td>
  );
  
}

