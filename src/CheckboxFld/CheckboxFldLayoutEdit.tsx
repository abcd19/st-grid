import * as ST from '../common'
import React from 'react';
import './Checkbox.css'


interface ICheckboxFldLayoutEditProps {
  onChange: (val: boolean) => void;
  readOnly: boolean;
  val: boolean | undefined;
}

// checkbox layout component
export class CheckboxFldLayoutEdit extends React.Component<ICheckboxFldLayoutEditProps>{
    
    private _val: boolean;

    /**
    * @constructor
    * @param {type} data
    */
    constructor(props: ICheckboxFldLayoutEditProps)
    {
      super(props);
      this.onClickHandle = this.onClickHandle.bind(this);
      this._val = false;
    }
      
    onClickHandle(): void
    {      
        if(this._val == true)
        {
          this._val = false;
        }else{
          this._val = true;
        }
 
        if(ST.isFunction(this.props.onChange))
        {
          this.props.onChange(this._val);
        }
    }

    render(): React.ReactNode
    {
      const style ={
        backgroundPosition: '30px 15px',
        opacity: ''
      };

      if(this.props.readOnly === true)
      {
        style.opacity = '0.5';
      }else{
        style.opacity = '1';
      }

      switch(this.props.val)
      {
        case true:
          this._val = true;
          style.backgroundPosition = '0px 15px';
          break;
        default:
          this._val = false;
          style.backgroundPosition = '30px 15px';
          break;
      }
      return (<div className="pr-checkbox-imgCont" onClick = {this.onClickHandle} style={style}></div>);
    }
}