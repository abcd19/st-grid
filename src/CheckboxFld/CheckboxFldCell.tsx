import React from 'react';
import {CheckboxFldLayoutEdit, ICheckboxFldLayoutEditProps, 
   typeCheckboxFldOnChange, typeCheckboxFldVal} from './CheckboxFldLayoutEdit';
import {IFldCellProps} from './../StringFld'

export interface ICheckboxFldCellProps extends IFldCellProps<typeCheckboxFldOnChange, typeCheckboxFldVal, ICheckboxFldLayoutEditProps>{};

export const CheckboxFldCell : React.FC<ICheckboxFldCellProps> = (props: ICheckboxFldCellProps) =>
{
  const {style, onMouseDownItem, className, onChangeItem, val, settings} = props;
  
  style['paddingLeft'] = '0px';
 
  return (
    <td align="center" style={style} onMouseDown = {onMouseDownItem}  className={className}>
      <CheckboxFldLayoutEdit readOnly={settings.readOnly}  onChange ={onChangeItem} val = {val} />
    </td>
    );
  
}

