

import {Table, ComboboxFldCell, CheckboxFldCell, StringFldLayoutEdit, ComboboxFldLayoutEdit, CheckboxFldLayoutEdit, DateFldLayoutEdit, DateFldCell} from './stgrid'
import {MyTable} from './examples/MyTable';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'



export const MyStringFld = () =>
{
  const [val, setVal] = useState('');
  return (<StringFldLayoutEdit readOnly={true} onChange={(newVal)=> setVal(newVal)} clearBtnFlag = {true} val = {val} />)
}


export const MyCombobox = () =>
{
  const [val, setVal] = useState({raw: 'raw5'});
  return (
      <div style={{width: 420, height:100,}}> 
        <ComboboxFldLayoutEdit />
      </div>)
}

export const MyCheckbox = () =>
{
  const [val, setVal] = useState('');
  return (<CheckboxFldLayoutEdit val = {val} />)
}


export function run()
{    
    ReactDOM.render(      
        <MyCheckbox  />
    , document.getElementById('myTbl1'));

} 

/*
window.addEventListener('resize', ()=>{
  
})
*/