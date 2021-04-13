
import * as ST from '../../common'
import {Combobox, LinearGroupLayout,  ImgButtonLayout} from '../../stgrid';
import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


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