import * as ST from '../common';
import React from 'react';
import {StringFldLayoutEdit} from './StringFldLayoutEdit';

export const StringFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val,
    onMouseEnterItem, onDoubleClickItem, onMouseLeaveItem, onClickItem, settings, handler} = props;
  
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onClick = {onClickItem} onDoubleClick = {onDoubleClickItem} onMouseDown = {onMouseDownItem} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem}   className={className}>
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
      <td  style={style} onClick = {onClickItem} onMouseEnter={onMouseEnterItem} onMouseLeave={onMouseLeaveItem} onDoubleClick = {onDoubleClickItem}  onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  )
  
}

