

import * as ST from '../../common'
import ReactDOM from 'react-dom';
import React from 'react';
import './Header.css'

/**
 * Ячейка заголовка грида
 */
 class HeaderCellLayout extends React.Component {
    
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);

    this.props= props;

    this.state = {
      startChord: 0,
      cellWidthChangingNow: false,
      clientWidth: this.props.width,
    };
    
    this.CELL_HEIGHT = 30;

    this.anchorMouseDownHandle = this.anchorMouseDownHandle.bind(this);
    this.anchorMouseMoveHandle = this.anchorMouseMoveHandle.bind(this);
    this.anchorMouseUpHandle = this.anchorMouseUpHandle.bind(this);

    this.startChord = 0;
    this.width = this.props.width;
  };
  

  
  clickHeaderCellHandle(){}


  //нажали кнопку на якоре изменения ширины
  anchorMouseDownHandle(e)
  {
    window.document.addEventListener('mousemove', this.anchorMouseMoveHandle);
    window.document.addEventListener('mouseup', this.anchorMouseUpHandle);

    this.setState({
      startChord: e.pageX,
      clientWidth: this.props.width,
      cellWidthChangingNow: true
    });
  }

  anchorMouseUpHandle()
  {
      window.document.removeEventListener('mousemove', this.anchorMouseMoveHandle);
      window.document.removeEventListener('mouseup', this.anchorMouseUpHandle);
      this.setState({
        cellWidthChangingNow: false
      });
  }

  anchorMouseMoveHandle(e)
  {
    if(this.state.cellWidthChangingNow == false)
    {
      return;
    }

    if(typeof(this.props['handler']['changeHeaderCellWidth']) == 'function')
    {
      let moveX = e.pageX - this.state.startChord; 
      let newWidth = this.state.clientWidth + moveX;
      if(this.state.clientWidth + moveX > 20)
      {
        this.props['handler']['changeHeaderCellWidth'](this.props.settings.alias, newWidth);
      }
    }
  }

  render(){
    let cellHeight = String(this.CELL_HEIGHT-1)+'px';
    this.width = this.props.width;
    return(
      <td  className="st-grid-head-cell st-grid-head-cell-project" style={{boxSizing: "border-box",  width: this.props.width+'px'  }}>
        <div style={{height: cellHeight}} className ="st-grid-head-cell-general">
          <div onClick={this.clickHeaderCellHandle} style={{height: cellHeight, lineHeight: cellHeight, width: this.props.width-12 +'px' }}  className ="st-grid-head-cell-textContainer" >{this.props.text}</div>
          <div onMouseDown={this.anchorMouseDownHandle} style={{height: cellHeight,  width: '5px' }} className="st-grid-head-cell-widthChangeAnchor"></div>
          <div style={{clear: "left"}}></div>
        </div>
    </td>)
  }
};


export {HeaderCellLayout}

