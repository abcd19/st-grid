

import {Table, ComboboxFldCell, CheckboxFldCell, StringFldLayoutEdit, ComboboxFldLayoutEdit, CheckboxFldLayoutEdit, DateFldLayoutEdit, DateFldCell} from './stgrid'
import {DragAndDropTree} from './examples/DragAndDropTree';
import {ParamsTbl} from './examples/PramsTbl/ParamsTbl';
import {ComplexFldLayoutEdit} from './examples/ComplexFld/ComplexFldLayoutEdit';
import {UploadFldLayoutEdit} from './examples/UploadFld/UploadFldLayoutEdit';
import {MyTree} from './examples/MyTree';
import {MyTable} from './examples/MyTable';
import {DayGridLayout} from './DateFld/Calendar/DayGridLayout';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


export const MyUploadFld = () =>
{
  const [val, setVal] = useState(undefined);
  return (<div style={{width: 420, height:100,}}> <UploadFld onChange={(newVal)=> setVal(newVal)} val = {val}   clearBtnFlag = {true} /></div>)
}


export const MyStringFld = () =>
{
  const [val, setVal] = useState('');
  return (<StringFldLayoutEdit readOnly={true} onChange={(newVal)=> setVal(newVal)} clearBtnFlag = {true} val = {val} />)
}

export const MyDateFld = () => 
{
  const [val, setVal] = useState(undefined);
  return (<div>
            <div style={{width: 420, height:100,}}> 
              <DateFldLayoutEdit readOnly={true} onChange={(newVal)=> setVal(newVal)} clearBtnFlag = {true} val = {val} />
            </div>
            <div>text</div>
          </div>);

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
  return (<CheckboxFldLayoutEdit onChange={(newVal)=> setVal(newVal)} val = {val} />)
}


export const MyComplexFld = () =>
{
  let types = [{
    alias: 'string',
    name: 'Строка',
    type: {
      constrEdit: StringFldLayoutEdit
    }},
    {
    alias: 'date',
    name: 'Дата',
    type: {
      constrEdit: DateFldLayoutEdit
    }},
    {
      alias: 'check',
      name: 'Флаг',
      type: {
        constrEdit: CheckboxFldLayoutEdit
      }
  }];

  const [val, setVal] = useState({type: 'check', val: true});

  return (
    <div style={{width: 420, height:100,}}> 
      <ComplexFldLayoutEdit showTypeCombobox = {false} val = {val} onChange={(val)=> setVal(val)} items={types}/>
    </div>
  )
}


export const MyParamsTbl = () =>
{
  let paramsTypeList = [
    {
      'display': 'Число',
      'raw': 'numeric', 
    },
    {
      'display': 'Строка',
      'raw': 'string', 
    },
    {
      'display': 'Дата',
      'raw': 'date',        
    },
    {
      'display': 'Булевый',
      'raw': 'check',        
    }];

    let items = [{
      data:{
        'name': 'Пар1',
        'type': {raw: 'string', display: 'Строка' },
        'value': {type: 'string', val: undefined},
        'arrayFlag': true
    }},
  
    {
      data:{
        'name': 'Пар2',
        'type': {raw: 'check', display: 'Булевый' },
        'value': {type: 'check', val: undefined},
        'arrayFlag': true
    }},
    {
      data:{
        'name': 'Пар3',
        'type': {raw: 'date', display: 'Дата' },
        'value': {type: 'date', val: undefined},
        'arrayFlag': true
    }}

    ];  

    return (<ParamsTbl items={items} paramsTypeList={paramsTypeList} />);

}

/*export function run()
{    

    ReactDOM.render(
      <div>
        <MyParamsTbl />
      </div>
    , document.getElementById('myTbl1'));
} */


export function run()
{    
  let height = document.documentElement.clientHeight-200;
    ReactDOM.render(      
      <div style={{marginTop: 400}}>
        <MyTree />
      </div>
    , document.getElementById('myTbl1'));

} 

/*
window.addEventListener('resize', ()=>{
  let height = document.documentElement.clientHeight-200;

  ReactDOM.render(
    <div>
      <DragAndDropTree height = {height} />
    </div>
  , document.getElementById('myTbl1'));
})
*/