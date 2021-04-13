import * as ST from '../common';
import React from 'react';
import {ComboboxFldLayoutEdit} from './ComboboxFldLayoutEdit';

export const ComboboxFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings} = props;
  let{listWidthPix, items,  clearBtnFlag} = settings;
  
  if(layoutMode == 'edit')
  {
    
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <ComboboxFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} listWidthPix={listWidthPix} clearBtnFlag={clearBtnFlag} val = {val} items = {items} />
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

