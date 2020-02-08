import * as ST from './../../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {LinearGroupLayout} from '../../StringFld/LinearGroupLayout';
import {ImgButtonLayout} from "../../StringFld/ImgButtonLayout";
/**
 * group of image buttons and other elements
 */
class ToolbarLayout extends React.Component{
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);
    this.props = props;
    this.state = {};
  };
  
  render()
  {
    let nItems = [];
    //console.dir(this.props['items'])
    for(let i = 0; i < this.props['items'].length; i++)
    {
      nItems.push(<ImgButtonLayout 
              imageName={this.props['items'][i]['type']['settings']['imageName']} 
              handler ={this.props['items'][i]['type']['settings']['handler']} 
              key={this.props['items'][i]['name']} 
              widthPix = "32" 
              size = "32"
              name={this.props['items'][i]['name']} 
         />);
    }

    
    return(
        <LinearGroupLayout prepareGridDisplay={true} items={ this.props['items'] } >
          {nItems}
        </LinearGroupLayout>
      )
  }

};
export {ToolbarLayout}

