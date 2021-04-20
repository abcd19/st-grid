import React from 'react';
import {FieldLayoutEdit} from './FieldLayoutEdit';


export interface IStringFldLayoutEditProps {
  onChangeDelay?: (val: string | undefined) => void,
  val?: string | undefined;
  clearBtnFlag?: boolean;
  onChange?: (val: string | undefined) => void;
  readOnly?: boolean;
  prepareGridDisplay?: boolean;
}

// string linear input & clear button
export const StringFldLayoutEdit : React.FC<IStringFldLayoutEditProps> = (
  {onChangeDelay=  () => { /** do nothing */}, val = undefined, clearBtnFlag = false, onChange = () => {/** do nothing */}, readOnly = false, prepareGridDisplay = false}: IStringFldLayoutEditProps) => {

  return(
      <FieldLayoutEdit 
        prepareGridDisplay = {prepareGridDisplay } 
        clearBtnFlag = {clearBtnFlag}
        readOnly = {readOnly}
        inputVal = {val} 
        buttons = {{items: []}} 
        onChangeDelay = { onChangeDelay }
        onChange = { onChange }
       />
    );
}	