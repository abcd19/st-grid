
import * as ST from './../../common'
import {ComboboxFldLayoutEdit} from '../../ComboboxFld/ComboboxFldLayoutEdit';
import {LinearGroupLayout} from './../../StringFld/LinearGroupLayout';
import React, {useRef, useEffect, useState} from 'react';


//комплексное поле
export function ComplexFldLayoutEdit(props)
{

 let {items, showTypeCombobox} = props;

 if(ST.isUndefined(showTypeCombobox))
 {
  showTypeCombobox = true;
 }

 let list = [];
 let constrAliasRel = {};
 items.forEach((cur, i, arr)=>{
  list.push({
    raw: cur['alias'],
    display:  cur['name'],
  });
  constrAliasRel[ cur['alias'] ] = cur['type'];
 })



 //сменили значение
 let onChangeObj = (val) =>
 {
    if(ST.isFunction(props.onChange))
    {
       //Если значения нет, то ставим первое значение из списка
      let curType = list[0]['raw'];
      if(ST.isObject(props.val) == true)
      {
        curType  = props.val['type'];
      }

      props.onChange({type: curType, val: val})
    }
 }

 //Если значения нет, то ставим первое значение из списка
 let val = {'type': list[0]['raw'], val: undefined}
 if(ST.isObject(props.val) == true)
 {
  val  = props.val;
 }

 
 const CurObj = constrAliasRel [  val['type'] ];

 let lin = [];

 //контрол для выбора значения
 lin.push( <CurObj.constrEdit prepareGridDisplay={props.prepareGridDisplay} {...CurObj.settings} key='obj' val={val['val']} onChange={onChangeObj}/> );
 
 //если нужно отобразить комбобокс с выбором типа, то добавляем его
 if(showTypeCombobox == true)
 {
    //сменили тип
  let onChangeType = (val)=>
  {
    if(ST.isFunction(props.onChange))
    {
      //при смене типа сбрасываем значение
      props.onChange({type: val['raw'], val: undefined})
    }
  }  

  lin.push( <ComboboxFldLayoutEdit items={list} val = {{raw: val['type']}} onChange={onChangeType} key='combo' widthPix={100}/> );
 }

 if(lin.length > 1)
 {
  return (
    <LinearGroupLayout prepareGridDisplay = { props.prepareGridDisplay }>
      {lin}
    </LinearGroupLayout>);
 }else{
   return lin[0];
 }
  
  
}