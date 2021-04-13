

import * as ST from './../../common'
import {ComboboxFldLayoutEdit} from '../../ComboboxFld/ComboboxFldLayoutEdit';
import {LinearGroupLayout} from './../../StringFld/LinearGroupLayout';
import React, {useRef, useEffect, useState} from 'react';


export function ComplexFldLayoutView(props)
{

 let {items} = props;

 let list = [];
 let constrAliasRel = {};
 items.forEach((cur, i, arr)=>{
  list.push({
    raw: cur['alias'],
    display:  cur['name'],
  });
  constrAliasRel[ cur['alias'] ] = cur['type'];
 })

 //Если значения нет, то ставим первое значение из списка
 let val = {'type': list[0]['raw'], val: undefined}
 if(ST.isObject(props.val) == true)
 {
  val  = props.val;
 }

 const CurObj = constrAliasRel [  val['type'] ];

  return (<CurObj.constrView {...props} {...CurObj.settings} key='obj' val={val['val']} />);
  
}