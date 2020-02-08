import * as ST from '../common';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sprite_24.css'
import './assets/sprite_32.css'


/**
 * Кнопка - картинка (Шаблон)
 */
class ImgButtonLayout extends React.Component {

	constructor(props)
  {
    super(props);
    
    this.props = props;
    let size =  this.props['size'];
    let imageName = this.props['imageName'];

    if(ST.isUndefined(size))    
    {
      size = 24;
    }

    if(ST.isUndefined(imageName))
    {
      imageName = 'idea';
    }

		this.state = {
			 'className': 'st_icon_'+size+'_' + imageName,
			 'backgroundColor': 'transparent'
    };
    
    this.handleLayoutLeave = this.handleLayoutLeave.bind(this);
    this.handleLayoutEnter = this.handleLayoutEnter.bind(this);
    this.handlerMouseDown = this.handlerMouseDown.bind(this);
    this.handlerMouseUp = this.handlerMouseUp.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick(e)
  {    
    if(ST.has(this.props, 'handler.click'))
    {
      this.props['handler']['click'].apply(this, [e]);
    }
  }


  handlerMouseDown()
  {
    this.setState(function(state, props) {
      
      return {
        backgroundColor: 'gray'
      }

    })
  }

  handlerMouseUp()
  {
    this.setState(function(state, props) {
      
      return {
        backgroundColor: 'transparent'
      }

    })
  }
  
  handleLayoutLeave()
  {
    this.setState(function(state, props) {
      
      return {
        backgroundColor: 'transparent'
      }

    })
  }

  handleLayoutEnter()
  {

    this.setState(function(state, props) {

      return {
            backgroundColor: 'lightgray'
          }
    })

  }

	render() {
    //если установлен флаг readOnly то снимаем все хендлеры
    let onClick,onMouseLeave, onMouseEnter,onMouseDown,onMouseUp;
    if(this.props.readOnly !== true)
    {
      onClick = this.handlerClick 
      onMouseLeave = this.handleLayoutLeave 
      onMouseEnter = this.handleLayoutEnter 
      onMouseDown = this.handlerMouseDown 
      onMouseUp = this.handlerMouseUp 
    }

		return (
			<div 
				style = {{ 
          width: this.props.size+'px',
          height: this.props.size+'px',
          backgroundColor: this.state.backgroundColor
        }}
        title = {this.props.title}
        onClick = { onClick }
        onMouseLeave = { onMouseLeave }
        onMouseEnter = { onMouseEnter }
        onMouseDown = { onMouseDown }
        onMouseUp = { onMouseUp }
				className = {this.state.className}>
			</div>
			);
	}
}


function createImgButtonLayout(wrapper, props)
{
	ReactDOM.render(<ImgButtonLayout size={props.size} imageName = {props.imageName} handler = {props.handler}/>, wrapper);
}

export {ImgButtonLayout, createImgButtonLayout};