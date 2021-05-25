import React from 'react';
import {FieldLayoutEdit} from './FieldLayoutEdit';


export type typeStringFldVal = string | undefined;
export type typeStringFldOnChange = (val: string | undefined) => void;

export interface IStringFldLayoutEditProps {
  onChangeDelay?: typeStringFldOnChange,
  val?: typeStringFldVal;
  clearBtnFlag?: boolean;
  onChange?: typeStringFldOnChange;
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