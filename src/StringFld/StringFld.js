import React from 'react';
import ReactDOM from 'react-dom';
import defaults from 'lodash/defaults';
import has from 'lodash/has';
import isSitring from 'lodash/isString';

import {StringFldLayoutEdit} from "./Layout/StringFldLayoutEdit";

/**
 * Строковое поле с кнопкой очистить
 */
class StringFld {
    
  constructor(data)
  {
    this._data = data;
     
    defaults(this._data,{
      'handler': {},
      'clearBtnFlag': false
    });
    
    this._val = undefined;

    this._readOnly = false;

    this._wrapper = this._data['wrapper'];

    this._style = {
      borderColor: undefined,
      fontWeight: undefined
    };

    this._prepareGridDisplay = false;
    
    this.clear();
    this.readOnly(false);
  };
  
  handleeChange(val)
  {
    //сохраняем
    this.setVal(val);
    //отрисовываем в dom
    this.commit();
    //вызываем внешний обработчик если есть
    if(has(this._data, 'handler.change'))
    {
      this._data['handler']['change'].apply(this, [val]);
    }
  };

  handlerCHnageDelay(val)
  {
    if(has(this._data, 'handler.changeDelay'))
    {
      this._data['handler']['changeDelay'].apply(this, [val]);
    }
  }

  setVal(val)
  {
    if(isSitring(val) == false)
    {
      val = '';
    }
    this._val = val;
  }; 
	
	getVal(val)
  {
    return this._val;
  }; 
	
	clear()
	{
    this._val =  '';
	};
	
	isEmpty()
	{
    return this._val == '';
	};
	
	readOnly(readOnly)
	{
    this._readOnly = readOnly;
	};
  
  defineWrapper(wrapper)
  {
    this._wrapper = wrapper;
  };
	
	readOnly(readOnly)
	{
    this._readOnly = readOnly
	}
    
	
	commit()
	{
    let handler = {
      change: this.handleeChange.bind(this),
      changeDelay: this.handlerCHnageDelay.bind(this)
    }

    ReactDOM.render(
        <StringFldLayoutEdit
          prepareGridDisplay = {this._prepareGridDisplay}
          readOnly={this._readOnly} 
          val={this._val} 
          clearBtnFlag={this._data['clearBtnFlag']} 
          handler = {handler}
        />, 
        this._wrapper);

	};
    
  commitTo(wrapper)
  {
    this.defineWrapper(wrapper);
    this.commit()
  };

  

  /**
   * Подготовить компонент для отображения в гриде
   */
  prepareGridDisplay()
  {
    this._prepareGridDisplay = true;
  }

  remove(){};
  fontWeight(fontWeight){}
	hasButtons(val){}
	resetFontWeight(){}
  borderColor(borderColor){}
}

export {StringFld}