import React from 'react';
import {FieldLayoutEdit} from './FieldLayoutEdit';


export type tyepStringFldVal = string | undefined;

export interface IStringFldLayoutEditProps {
  onChangeDelay?: (val: string | undefined) => void,
  val?: tyepStringFldVal;
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