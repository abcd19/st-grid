
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @class
 */
class ListItemLayout extends React.Component{
    
    /**
     * @constructor
     * @param {type} data
     */
    constructor(props)
    {
      super(props);
      this.onMouseOverHandle = this.onMouseOverHandle.bind(this);
      this.onMouseOutHandle = this.onMouseOutHandle.bind(this);
      this.onClickHandle = this.onClickHandle.bind(this);
      this.state = {
        mouseOver: false
      }
      this.div = React.createRef();
    };

    markMouseOver(on)
    {
      if(on === true)
      {
        this.setState({mouseOver: true})
      }else{
        this.setState({mouseOver: false})
      }
    }

    onMouseOverHandle()
    {
      this.markMouseOver(true)
    }
    
    onMouseOutHandle()
    {
      this.markMouseOver(false)
    }

    onClickHandle()
    {
      this.props.onClick(this.props.val);
    }

    componentDidMount()
    {
      if(this.props.setScroll == true)
      {
        this.div.current.scrollIntoView({ behavior: 'auto', block: "center" })
      }
    }



    render(){
      
      let style ={
        borderTop: '1px lightgray solid',
        height: '18px',
        whiteSpace: 'nowrap',
        lineHeight: 'normal',
        fontKerning: 'auto',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingTop: '2px',
        paddingBottom: '2px',
        boxSizing: 'content-box',
      }
 
      if(this.state.mouseOver == true)
      {
        style.background = '#FEFFBF'
      }else{

        if(this.props.isSelected == true)
        {
          style.background = '#EDF5FC';
        }else{
          style.background = 'white';
        }
        
      }

      return(
        <div ref={ this.div } style={style} onClick={ this.onClickHandle } onMouseOver={ this.onMouseOverHandle } onMouseOut={ this.onMouseOutHandle }> { this.props.val.display }</div>
      );
    }
    
};
export {ListItemLayout}