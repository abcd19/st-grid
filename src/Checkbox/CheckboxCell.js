import * as ST from '../common';
import React from 'react';
import {CheckboxLayout} from './CheckboxLayout';

export const CheckboxCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, className, onChangeItem, val, settings, handler} = props;

  if(layoutMode == 'edit')
  {
    style['paddingLeft'] = '2px';
    return ( 
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <CheckboxLayout onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }

  style['align'] = 'center';
  
  return (
    <td align="center" style={style} onMouseDown = {onMouseDownItem}  className={className}>
      <CheckboxLayout onChange ={onChangeItem} prepareGridDisplay = {true} val = {val} />
    </td>
    );
  
}

