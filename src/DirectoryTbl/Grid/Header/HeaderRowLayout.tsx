import {HeaderCellLayout} from './HeaderCellLayout'
import React from 'react';
import {IHeaderLayoutProps} from './HeaderLayout';

export interface IHeaderRowLayoutProps extends IHeaderLayoutProps {};

/* header row */
export const HeaderRowLayout: React.FC<IHeaderRowLayoutProps> = (props: IHeaderRowLayoutProps)=> {

  const items = [];

  const {columns, sortingFlag = false}  = props;

  for(let i = 0; i < columns.length; i++)
  {
    if(columns[i]['visible'] === false)
    {
      continue;
    }
    
    const {widthPix, title, alias} = columns[i];

    const newItem = <HeaderCellLayout 
                        key = {i} 
                        sortingFlag={sortingFlag}
                        width = {widthPix}
                        changeHeaderCellWidth={props.changeHeaderCellWidth} 
                        clickHeaderCell={props.clickHeaderCell}
                        alias={alias} 
                        title={title} />;
                
    items.push(newItem);
  }
  return(<tr>
          {items}
          <td  className='st-grid-head-cell-freeSpace'></td>
        </tr>)
}



