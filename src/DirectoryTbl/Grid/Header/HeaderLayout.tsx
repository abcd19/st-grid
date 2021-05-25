
import {HeaderRowLayout} from './HeaderRowLayout';
import React from 'react';
import {typeColumn} from './../../Grid/GridLayout'
import {GridLayout} from './../GridLayout';

export type typeHandler = {
  changeHeaderCellWidth: (cellAlias: string, width: number)=>void,
  clickHeaderCell: (alias: string, order?: string)=>void
}

export interface IHeaderLayoutProps {
  onChangeHeaderCellWidth: (this: GridLayout, cellAlias: string, width: number)=>void;
  clickHeaderCell: (alias: string, order?: string) => void
  columns: typeColumn[];
  sortingFlag: boolean;
}


/* header */
export class HeaderLayout extends React.Component<IHeaderLayoutProps> {
      

  constructor(props: IHeaderLayoutProps)
  {
    super(props);
  }
  
  render(): React.ReactElement
  {  
    const handler: typeHandler = {
      changeHeaderCellWidth: this.props.onChangeHeaderCellWidth,
      clickHeaderCell: this.props.clickHeaderCell,
   };

   const columns = this.props['columns'];

    return(
      <table cellPadding="0" cellSpacing="0" className="st-innerTableLayout-table" style={{borderCollapse: "collapse"}}>
        <tbody>
          <HeaderRowLayout sortingFlag={this.props.sortingFlag} handler ={handler} columns={columns} />
        </tbody>
      </table>
    )
  }

}


