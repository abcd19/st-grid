import * as ST from '../common';
import React from 'react';
import {ComboboxLayoutEdit} from './ComboboxLayoutEdit';

export const ComboboxCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings, handler} = props;
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <ComboboxLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} items = {settings.items} />
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

