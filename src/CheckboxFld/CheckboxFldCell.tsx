import React from 'react';
import {CheckboxFldLayoutEdit} from './CheckboxFldLayoutEdit';

export interface ICheckboxFldCellProps {
  layoutMode: string;
  style: React.CSSProperties;
  onMouseDownItem: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  className: string;
  settings: {readOnly: boolean}
  onChangeItem: (val: boolean) => void;
  val: boolean | undefined;
}

export const CheckboxFldCell : React.FC<ICheckboxFldCellProps> = (props: ICheckboxFldCellProps) =>
{
  const {layoutMode, style, onMouseDownItem, className, onChangeItem, val, settings} = props;
  
  style['paddingLeft'] = '0px';
 
  if(layoutMode == 'edit')
  {
    return ( 
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <CheckboxFldLayoutEdit readOnly={settings.readOnly} onChange ={onChangeItem} val = {val} />
        </td>
      );
  }
  
  return (
    <td align="center" style={style} onMouseDown = {onMouseDownItem}  className={className}>
      <CheckboxFldLayoutEdit readOnly={settings.readOnly}  onChange ={onChangeItem} val = {val} />
    </td>
    );
  
}

