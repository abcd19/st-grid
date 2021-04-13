import * as ST from '../common'
import React, {useRef, useEffect, useState} from 'react';
import {FieldLayoutEdit} from './../StringFld/FieldLayoutEdit'
import {CalendarLayout}  from './Calendar/CalendarLayout';
import {getOutputDate, getOutputMonth, DATE_NOW, convertDate_FromRus_toObject} from './functions'

/**
 * Поле для ввода дат
 */
export const DateFldLayoutEdit = (props) => {

  const [isOpened, setOpenedFlag] = useState(false);
  
  let buttons = {
    items: []
  };
  
  buttons['items'].push({
    name: 'uploadBtn',
    settings: { 
      handler:{
        click: ()=> { 
          if(isOpened)
          {
            setOpenedFlag(false);
          }else{
            setOpenedFlag(true);
          } 
        }
      },
      imageName: 'calendar'
    }
  });
  
  let fieldLayout = <FieldLayoutEdit 
          inputVal = {props.val}
          clearBtnFlag = {props['clearBtnFlag']}
          prepareGridDisplay = { props.prepareGridDisplay }  
          buttons ={ buttons } 
        />
  
  const onSelectDay = (date) =>
  {
    if(ST.isFunction(props.onChange))
    {
      if(isOpened)
      {
        setOpenedFlag(false);
      }else{
        setOpenedFlag(true);
      };
      props.onChange(getOutputDate(date)+"."+getOutputMonth(date)+"."+date.getFullYear())
    }
  }

  let obj;
  if(isOpened == true)
  {
    let selDate = DATE_NOW;
    let {val} = props;
    let temp = convertDate_FromRus_toObject(val);
    if(ST.isUndefined(temp) == false)
    {
      selDate = temp;
    }

    obj = <tr>
            <td><CalendarLayout onDayClick={onSelectDay} selDate={selDate} /></td>
          </tr>
  }

  return(
      <table cellPadding="0" cellSpacing="0" style={{padding: '0px', height:'25px', width: '100%'}}>
        <tbody>
          <tr>
            <td>
              {fieldLayout}
            </td>
          </tr>
          {obj}
        </tbody>  
      </table>);
      
}	