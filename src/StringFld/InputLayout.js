import * as ST from '../common'
import React from 'react';
import './assets/InputLinear.css'


/**
 * Инупт типа text (Шаблон)
 */
 class InputLayout extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state = {
      type: 'text',
      value: '',
    }
    this.onChangeDelayTimer = undefined;
    this.onChange = this.onChange.bind(this);
    this.inputRef =React.createRef();
  }

  onChange(event)
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

    let {canUserSelectFlag, val, readOnly, placeholder} = this.props;
    
    if(ST.isUndefined(val))
    {
      val = '';
    }else{
      val = String(val);
    }
    
    let _baseStyle = {
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

export {InputLayout};