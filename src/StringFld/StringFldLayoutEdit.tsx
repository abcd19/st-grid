import React from 'react';
import {FieldLayoutEdit} from './FieldLayoutEdit';


export interface IStringFldLayoutEditProps {
  handler?:{
    changeDelay: () => void,
  };
  val?: string | undefined;
  clearBtnFlag?: boolean;
  onChange?: () => void;
  readOnly?: boolean;
  prepareGridDisplay?: boolean;
}

// string linear input & clear button
export const StringFldLayoutEdit : React.FC<IStringFldLayoutEditProps> = (
  {handler = {changeDelay:  () => { /** do nothing */}}, val = undefined, clearBtnFlag = false, onChange = () => {/** do nothing */}, readOnly = false, prepareGridDisplay = false}: IStringFldLayoutEditProps) => {

  return(
      <FieldLayoutEdit 
        prepareGridDisplay = {prepareGridDisplay } 
        clearBtnFlag = {clearBtnFlag}
        readOnly = {readOnly}
        inputVal = {val} 
        buttons = {{items: []}} 
        onChangeDelay = { handler['changeDelay'] }
        onChange = { onChange }
       />
    );
}	