import {HeaderCellLayout} from './HeaderCellLayout'
import React from 'react';


export interface IeaderRowLayoutProps {
  columns: any[];
  handler: any;
  sortingFlag: boolean;
}

/* header row */
export class HeaderRowLayout extends React.Component<IeaderRowLayoutProps> {
  

  constructor(props: IeaderRowLayoutProps)
  {
    super(props);
  };


  render(){

    let items = [];
    
    for(let i = 0; i < this.props['columns'].length; i++)
    {
      if(this.props['columns'][i]['visible'] === false)
      {
        continue
      }
      
      let newItem = <HeaderCellLayout 
                          key = {i} 
                          sortingFlag={this.props.sortingFlag}
                          width = {this.props['columns'][i]['widthPix']}
                          handler={this.props['handler']}  
                          settings={this.props['columns'][i]} 
                          text={this.props['columns'][i]['title']} />;
                  
      items.push(newItem);
    }
    return(<tr>
            {items}
            <td  className='st-grid-head-cell-freeSpace'></td>
          </tr>)
  }
  
};

