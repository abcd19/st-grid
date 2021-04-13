import * as ST from '../common';
import React, {useState} from 'react';
import {StringFldLayoutEdit} from './StringFldLayoutEdit';
//import './../Tree/assets/sprite_16.css';
import './assets/sprite_24.css';

export const StringFldAnchoredCell = (props) =>
{
  let {layoutMode, widthPix, style, onMouseDownItem, onChangeItem, onMouseLeaveItem, onMouseEnterItem, onDoubleClickItem, onClickItem,  className, val, settings, rowItem} = props;
  let {onCloseGroup, onOpenGroup, clearBtnFlag, canUserSelectFlag, readOnly} = settings;
  let {isOpened, isGroup} = rowItem.link;

  if(ST.isBoolean(canUserSelectFlag) == false)
  {
    canUserSelectFlag = true;
  }


  if(ST.isUndefined(val))
  {
    val  = '';
  }else{
    val = String(props.val)
  }


  const onAnchorClick = (e) => {
    //если открыто, закрываем
    if(isOpened)
    {      
      if(ST.isFunction(onCloseGroup))
      {
        onCloseGroup(rowItem);
      }
      
    }else{
      if(ST.isFunction(onOpenGroup))
      {
        onOpenGroup(rowItem);
      }
    }
    e.stopPropagation()
  };
 

  let badge = "st_icon_24_document";
  let btn;
  let marginLeft = 22*rowItem.deep;
  let innerPadding = style.paddingLeft;
  if(isGroup == true)
  {

    btn = <div className={isOpened? "st_icon_16_arrow_down_black":"st_icon_16_arrow_right_black"} style={{ width: '16px', height: '16px', padding:'0px', /*  border: '1px solid red',*/ marginRight: '2px'}} onMouseDown = {(e)=> e.stopPropagation()} onClick={onAnchorClick}>{ }</div>
   
    if(isOpened)
    {
      badge = "st_icon_24_openedFolder";
    }else{
      badge = "st_icon_24_folder";
    }

  }else{
    btn = <div style={{ width: '16px', height: '16px', padding:'0px', /*  border: '1px solid red',*/ marginRight: '5px'}}>{ }</div>
  }
  //паддинг переносим внутрь
  style.paddingLeft = '0px';
 
  let comp;
  let comStyle = {};
  if(layoutMode == 'edit' && canUserSelectFlag == true)
  {
    comp =  <StringFldLayoutEdit onChange ={onChangeItem} prepareGridDisplay = {true} canUserSelectFlag={canUserSelectFlag} readOnly = {readOnly} clearBtnFlag={clearBtnFlag} val = {val} />
    
  }else{
    comp =  val;
    comStyle.textOverflow = 'ellipsis';
    comStyle.whiteSpace ='nowrap';
    comStyle.maxWidth = 0;
    comStyle.overflow = 'hidden';
  }

  if(canUserSelectFlag == false && layoutMode == 'edit')
  {
    innerPadding = '5px';
  }

  let bageDiv = (<div className={badge}  style={{ width: '24px', height: '24px', padding:'0px'}}></div>);
  
  if(isGroup)
  {
    bageDiv =  (<div className={badge} onMouseDown = {(e)=> e.stopPropagation()} onClick={onAnchorClick} style={{ width: '24px', height: '24px', padding:'0px'}}></div>)
  }

  return (
    <td align="center" onMouseEnter={onMouseEnterItem} onClick = {onClickItem} onDoubleClick={onDoubleClickItem} onMouseLeave={onMouseLeaveItem}  style={style} onMouseDown = {onMouseDownItem}   className={className}>
      <table style={{borderSpacing: '0px', margin: '0px', padding: '0px', width: '100%', height: '100%'}}>
        <tbody>
          <tr>
            <td id="StringFldAnchoredCell-marginLeft" style={{width: marginLeft}}></td>
            <td id="StringFldAnchoredCell-button" align="center"  style={{width: '16px', height: '16px',  /*, borderRight:'1px solid red'*/}}>
              { btn }
            </td>
            <td id="StringFldAnchoredCell-badge"  align="center"  style={{width: '24px', height: '24px' /*, borderRight:'1px solid red'*/}}>
              {bageDiv}
              {/*
                погрузим часть спрайа с закрытой папкой чтобы устранить мерцание
                не работает???
              */}
              <div className="st_icon_24_folder" style={{display: 'none' }}></div>
            </td>
            <td title={val} style={{paddingLeft: innerPadding,   userSelect: canUserSelectFlag? 'auto':'none', ...comStyle}} id="StringFldAnchoredCell-comp" >{comp}</td>
            
          </tr>
          </tbody>
      </table>
    </td>   
  )
  
}

