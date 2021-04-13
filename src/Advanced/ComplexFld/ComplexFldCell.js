import {ST} from './../../common'
import React from 'react';
import {ComplexFldLayoutEdit} from './ComplexFldLayoutEdit';
import {ComplexFldLayoutView} from './ComplexFldLayoutView';

export const ComplexFldCell = (props) =>
{
  let {layoutMode, style, onMouseDownItem, onChangeItem, className, val, settings, handler} = props;
  
  if(layoutMode == 'edit')
  {
    return (
        <td align="center"  style={style} onMouseDown = {onMouseDownItem}  className={className}>
            <ComplexFldLayoutEdit prepareGridDisplay = {true} onChange ={onChangeItem} prepareGridDisplay = {true} showTypeCombobox={settings.showTypeCombobox} clearBtnFlag={true} val = {val} items = {settings.items} />
        </td>
      );

  }else{

    return (
      <ComplexFldLayoutView  val = {val} items = {settings.items}  {...props}/>
    );

  }


  /*if(ST.has(val, 'val.display'))
  {
    
    val = val['val']['display'];
  }else if(ST.has(val, 'val')){
    val = val['val'];
  }else{
    val = undefined;
  }

  return (
    <td  style={style} onMouseDown = {onMouseDownItem} className={className}> { val }</td>
  );*/
  
}

