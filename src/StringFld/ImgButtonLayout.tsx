import React from 'react';
import './assets/sprite_24.css'
import './assets/sprite_32.css'

export interface IImgButtonLayoutProps {
  widthPix?: number;
  imageName?: string;
  title?: string;
  handler: {
    click: (e: React.MouseEvent<HTMLDivElement>) => void
  };
  readOnly?: boolean;
}

interface IImgButtonLayoutState {
  className: string,
  backgroundColor: string
}

// image button
export class ImgButtonLayout extends React.Component<IImgButtonLayoutProps, IImgButtonLayoutState> {

  static defaultProps: IImgButtonLayoutProps = {
    readOnly: false,
    imageName: 'idea',
    title: 'button',
    widthPix: 24,
    handler: {
      click: (/*e: React.MouseEvent<HTMLDivElement>*/) => { /** do nothing */}
    }
  }

	constructor(props: IImgButtonLayoutProps)
  {
    super(props);

    const size =  this.props['widthPix'];
    const imageName = this.props['imageName'];

		this.state = {
			 'className': `st_icon_${size}_${imageName}`,
			 'backgroundColor': 'transparent'
    };
    
    this.handleLayoutLeave = this.handleLayoutLeave.bind(this);
    this.handleLayoutEnter = this.handleLayoutEnter.bind(this);
    this.handlerMouseDown = this.handlerMouseDown.bind(this);
    this.handlerMouseUp = this.handlerMouseUp.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick(e: React.MouseEvent<HTMLDivElement>): void
  {    
    this.props.handler.click.apply(this, [e]);
  }


  handlerMouseDown(/*e: React.MouseEvent<HTMLDivElement>*/): void
  {
    this.setState(function(/*state, props*/) {
      
      return {
        backgroundColor: 'gray'
      }

    });
  }

  handlerMouseUp(/*e: React.MouseEvent<HTMLDivElement>*/): void
  {
    this.setState(function(/*state, props */) {
      
      return {
        backgroundColor: 'transparent'
      }

    });
  }
  
  handleLayoutLeave(): void
  {
    this.setState(function(/*state, props */) {
      
      return {
        backgroundColor: 'transparent'
      }

    })
  }

  handleLayoutEnter(): void
  {

    this.setState(function(/*state, props */) {

      return {
            backgroundColor: 'lightgray'
          }
    })

  }

	render(): React.ReactElement {
    
    let onClick, onMouseLeave, onMouseEnter, onMouseDown, onMouseUp;

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
          width: this.props.widthPix + 'px',
          height: this.props.widthPix + 'px',
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
