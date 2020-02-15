import * as ST from './../common'
import React from 'react';
import ReactDOM from 'react-dom';
//import './Checkbox.css'

class CheckboxLayout extends React.Component{
    
    /**
    * @constructor
    * @param {type} data
    */
    constructor(props)
    {
      super(props);
      this.props = props;
      this.onClickHandle = this.onClickHandle.bind(this);
      this._val = false;
    };
      
    onClickHandle(e)
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

    render()
    {
      
      let style ={
        backgroundPosition: '30px 15px'
      };

      if(this.props.readOnly === true)
      {
        //снимаем клик
        style.opacity = '0.5';
      }else{
        //устанавливаем клик
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
        /*case undefined:
          this._val = 'indeterminate';
          style.backgroundPosition = '15px 15px';
          break;*/
      }

      

      return (<div className="pr-checkbox-imgCont" onClick = {this.onClickHandle} style={style}></div>);
    }
};

export {CheckboxLayout}