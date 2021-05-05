import {HeaderCellLayout} from './HeaderCellLayout'
import React from 'react';
import {typeColumn} from './../../Grid/GridLayout'
import {typeHandler} from './HeaderLayout';

export interface IeaderRowLayoutProps {
  columns: typeColumn[];
  handler: typeHandler;
  sortingFlag: boolean;
}

/* header row */
export class HeaderRowLayout extends React.Component<IeaderRowLayoutProps> {
  

  constructor(props: IeaderRowLayoutProps)
  {
    super(props);
  }


  render(): React.ReactElement
  {

    const items = [];
    
    for(let i = 0; i < this.props['columns'].length; i++)
    {
      if(this.props['columns'][i]['visible'] === false)
      {
        continue
      }
      
      let {widthPix, title} = this.props['columns'][i];

      let cWidthPix: number = 100;
      if(typeof(widthPix) =='number' && widthPix >=0)
      {
        cWidthPix = widthPix;
      }

      const newItem = <HeaderCellLayout 
                          key = {i} 
                          sortingFlag={this.props.sortingFlag}
                          width = {cWidthPix}
                          handler={this.props['handler']}  
                          settings={this.props['columns'][i]} 
                          text={title} />;
                  
      items.push(newItem);
    }
    return(<tr>
            {items}
            <td  className='st-grid-head-cell-freeSpace'></td>
          </tr>)
  }
  
}

