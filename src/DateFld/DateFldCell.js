import * as ST from '../common';
import React from 'react';
import {DateFldLayoutEdit} from './DateFldLayoutEdit';

export const DateFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val} = props;
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <DateFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} clearBtnFlag={true} val = {val} />
        </td>
      );
  }


  return (
    <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  );
  
}

