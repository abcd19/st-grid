import * as ST from '../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {FieldLayoutEdit} from './FieldLayoutEdit';

/**
 * Строковое поле с кнопкой очистить
 */
export const StringFldLayoutEdit = (props) => {

  let {handler, val, clearBtnFlag, onChange, readOnly} = props;
    
  if(ST.isUndefined(handler))
  {
    handler = {};
  }

  return(
      <FieldLayoutEdit 
        prepareGridDisplay = { props.prepareGridDisplay } 
        clearBtnFlag = {clearBtnFlag}
        
        inputVal = {val} 
        onChangeDelay = { handler['changeDelay'] }
        onChange = { onChange }
       />
    );
}	