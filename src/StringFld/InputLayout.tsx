import * as ST from '../common'
import React from 'react';
import './assets/InputLinear.scss'

export interface IInputLayoutEditProps {
  onChangeDelay?: any,
  onChange?: any,
  val?: string,
  readOnly?: boolean, 
  placeholder?: 'string',
}

// line input
export class InputLayout extends React.Component<IInputLayoutEditProps> {

  private onChangeDelayTimer: any;

  private inputRef: any;

  constructor(props: IInputLayoutEditProps)
  {
    super(props);
    
    this.state = {
      type: 'text',
      value: '',
    }
    this.onChangeDelayTimer = undefined;
    this.onChange = this.onChange.bind(this);
    this.inputRef = React.createRef()
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  {    

    if(ST.isFunction(this.props['onChangeDelay']))
    {
        if(this.onChangeDelayTimer != undefined)
        {
          clearTimeout(this.onChangeDelayTimer);
        }

        let self= this;

         this.onChangeDelayTimer = setTimeout(function(){

          if(ST.isObject(self.inputRef.current))
          {
            self.props['onChangeDelay'].apply(self, [self.inputRef.current.value]);
          }
          
        //задержка в пол секунды    
        },500);
    }
   
    //onChange происходит сразу
    if(ST.isFunction(this.props['onChange']))
    {
      this.props['onChange'].apply(this, [event.target.value]);
    }
  }

  render() {

    let {val, readOnly, placeholder} = this.props;
    
    if(ST.isUndefined(val))
    {
      val = '';
    }else{
      val = String(val);
    }
    
    let _baseStyle: React.CSSProperties = {
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      fontKerning: 'auto',
      fontFamily: '"Tahoma", Helvetica, Arial, sans-serif',
      fontSize: '10pt'
    }

    return (
        <input 
          type = "text" 
          ref = {this.inputRef}
          value = {val}
          style={_baseStyle}
					readOnly = {readOnly}
					onChange = { this.onChange }
          className = "st-core-input-input" 
          placeholder={placeholder} />
      );
  }
}