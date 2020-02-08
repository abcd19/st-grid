import * as ST from '../common'
import React from 'react';
import ReactDOM from 'react-dom';
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
    this.handleChange = this.handleChange.bind(this);

    this.inputRef =React.createRef();
    
  }

  handleChange(event)
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
    let val = this.props.val;
    
    if(ST.isUndefined(val))
    {
      val = '';
    }else{
      val = String(this.props.val);
    }
    
    return (
        <input 
          type = "text" 
          ref = {this.inputRef}
					value = {val}
					readOnly = {this.props.readOnly}
					onChange = { this.handleChange }
          className = "st-core-input-input" 
          placeholder={this.props.placeholder} />
      );
  }
}

function createInputLayout(wrapper, props)
{
  ReactDOM.render(<InputLayout 
    placeholder={props.placeholder} 
    value={props.value} 
    readOnly={props.readOnly}  
    handler= {props.handler}/>, wrapper);
}

export {InputLayout, createInputLayout};