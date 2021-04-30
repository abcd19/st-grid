import * as ST from '../../common'
import React from 'react';
import {LinearGroupLayout} from '../../StringFld/LinearGroupLayout';
import {ImgButtonLayout} from "../../StringFld/ImgButtonLayout";


export interface IToolbarLayoutProps {
  items: any[]
}


/**
 * group of image buttons and other elements
 */
 export class ToolbarLayout extends React.Component<IToolbarLayoutProps>{
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props: IToolbarLayoutProps)
  {
    super(props);
    this.state = {};
  }
  
  render()
  {
    const nItems = [];
    //console.dir(this.props['items'])
    for(let i = 0; i < this.props['items'].length; i++)
    {
      const Constr = this.props['items'][i]['type']['constr'];
      const settings = this.props['items'][i]['type']['settings'];
      const {name, widthPix} = this.props['items'][i]
      nItems.push(<Constr
              //imageName={imageName} 
              //handler ={handler} 
              key={name} 
              widthPix = { widthPix ?  widthPix: "32" }
             // size = "32"
              name={name} 
              {...settings}
              />);
    }

    
    return(
        <LinearGroupLayout height={32} prepareGridDisplay={true}  >
          {nItems}
        </LinearGroupLayout>
      )
  }
}

