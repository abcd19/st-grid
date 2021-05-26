import React from 'react';
import css from './Checkbox.scss';


export type typeCheckboxFldVal = boolean;

export type typeCheckboxFldOnChange = (val: typeCheckboxFldVal) => void;

export interface ICheckboxFldLayoutEditProps {
  onChange?: typeCheckboxFldOnChange;
  readOnly?: boolean;
  val?: typeCheckboxFldVal;
}

export const CheckboxFldLayoutEdit: React.FC<ICheckboxFldLayoutEditProps> = (props: ICheckboxFldLayoutEditProps) =>
{
  let {
      readOnly = false, 
      onChange = ( /* val: boolean */) => { /* do nothing */ }, 
      val = false} = props;

  const style: React.CSSProperties = {
    backgroundPosition: '30px 15px',
    opacity: ''
  };
    
  if(readOnly === true)
  {
    style.opacity = '0.5';
  }else{
    style.opacity = '1';
  }

  switch (val)
  {
    case true:
      style.backgroundPosition = '0px 15px';
      break;
    default:
      style.backgroundPosition = '30px 15px';
      break;
  }

  return (<div className={css.imgCont} onClick = { ()=> !readOnly && onChange(!val) } style={style}></div>);
}