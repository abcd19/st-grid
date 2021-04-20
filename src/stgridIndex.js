

import {Table, ComboboxFldCell, CheckboxFldCell, StringFldLayoutEdit, ComboboxFldLayoutEdit, CheckboxFldLayoutEdit, DateFldLayoutEdit, DateFldCell} from './stgrid'
import {MyTable} from './examples/MyTable';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


export const MyStringFld = () =>
{
  const [val, setVal] = useState('');
  return (<StringFldLayoutEdit onChange = {setVal} val = {val} clearBtnFlag={true}/>)
}

export const MyCombobox = () =>
{
  let list = [
    { raw: "newcomer", display: "newcomer" },
    { raw: "intermediate", display: "intermediate" },
    { raw: "advanced", display: "advanced user" }
  ];

  for(let i = 0; i < 10; i++)
  {
    list.push({ raw: "text" + i, display: "text" + i })
  }
  
  const [val, setVal] = useState(list[0]);

  return (
      <div style={{width: 420, height: 100,}}> 
        <ComboboxFldLayoutEdit items={list} val={val} onChange={setVal} />
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
        <MyCombobox    />
    , document.getElementById('myTbl1'));

} 

/*
window.addEventListener('resize', ()=>{
  
})
*/