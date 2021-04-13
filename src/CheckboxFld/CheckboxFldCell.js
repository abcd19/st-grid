import * as ST from '../common';
import React from 'react';
import {CheckboxFldLayoutEdit} from './CheckboxFldLayoutEdit';

export const CheckboxFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, className, onChangeItem, val, settings, handler} = props;

  style['align'] = 'center';
  
  style['paddingLeft'] = '0px';

  if(layoutMode == 'edit')
  {
    return ( 
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <CheckboxFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }
  
  return (
    <td align="center" style={style} onMouseDown = {onMouseDownItem}  className={className}>
      <CheckboxFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} val = {val} />
    </td>
    );
  
}

