import * as ST from '../common';
import React from 'react';
import {StringFldLayoutEdit} from './StringFldLayoutEdit';

export const StringFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings, handler} = props;

  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}   className={className}>
            <StringFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }

    if(ST.isUndefined(val))
    {
      val  = '';
    }else{
      val = String(props.val)
    }
     
  return (
      <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  )
  
}

