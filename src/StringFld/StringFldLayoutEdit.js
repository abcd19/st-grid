import * as ST from '../common'
import React from 'react';
import {FieldLayoutEdit} from './FieldLayoutEdit';

/**
 * Строковое поле с кнопкой очистить
 */
export const StringFldLayoutEdit = (props) => {

  let {handler, val, clearBtnFlag, onChange, readOnly, canUserSelectFlag, prepareGridDisplay} = props;
    
  if(ST.isUndefined(handler))
  {
    handler = {};
  }

  return(
      <FieldLayoutEdit 
        canUserSelectFlag = {canUserSelectFlag}
        prepareGridDisplay = {prepareGridDisplay } 
        clearBtnFlag = {clearBtnFlag}
        readOnly = {readOnly}
        inputVal = {val} 
        onChangeDelay = { handler['changeDelay'] }
        onChange = { onChange }
       />
    );
}	