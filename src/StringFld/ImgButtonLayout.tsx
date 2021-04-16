import * as ST from '../common';
import React from 'react';
import './assets/sprite_24.css'
import './assets/sprite_32.css'

export interface IImgButtonLayoutProps {
  size?: number,
  imageName?: string,
  title?: string,
  handler: {
    click?: any| undefined,
    mousedown?: any| undefined,
    mouseup?: any| undefined,
  },
  readOnly?: boolean
}

interface IImgButtonLayoutState {
  className: string,
  backgroundColor: string
}

// image button
export class ImgButtonLayout extends React.Component<IImgButtonLayoutProps, IImgButtonLayoutState> {

	constructor(props: IImgButtonLayoutProps)
  {
    super(props);

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

  handlerClick(e: React.MouseEvent<HTMLDivElement>)
  {    
    if(ST.has(this.props, 'handler.click'))
    {
      this.props['handler']['click'].apply(this, [e]);
    }
  }


  handlerMouseDown(e: React.MouseEvent<HTMLDivElement>)
  {
    this.setState(function(state, props) {
      
      return {
        backgroundColor: 'gray'
      }

    });

    if(ST.has(this.props, 'handler.mousedown'))
    {
      this.props['handler']['mousedown'].apply(this, [e]);
    }
  }

  handlerMouseUp(e: React.MouseEvent<HTMLDivElement>)
  {
    this.setState(function(state, props) {
      
      return {
        backgroundColor: 'transparent'
      }

    });

    if(ST.has(this.props, 'handler.mouseup'))
    {
      this.props['handler']['mouseup'].apply(this, [e]);
    }
    
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
