
import {HeaderRowLayout} from './HeaderRowLayout';
import React from 'react';


export interface IHeaderLayoutProps {
  onChangeHeaderCellWidth: ()=>void;
  clickHeaderCell: ()=>void;
  columns: any[];
  sortingFlag: boolean;
}


/* header */
export class HeaderLayout extends React.Component<IHeaderLayoutProps> {
      

  constructor(props: IHeaderLayoutProps)
  {
    super(props);
  };
  
  render()
  {  
    let handler= {
      changeHeaderCellWidth: this.props.onChangeHeaderCellWidth,
      clickHeaderCell: this.props.clickHeaderCell,
   };

   let columns = this.props['columns'];

    return(
      <table cellPadding="0" cellSpacing="0" className="st-innerTableLayout-table" style={{borderCollapse: "collapse"}}>
        <tbody>
          <HeaderRowLayout sortingFlag={this.props.sortingFlag} handler ={handler} columns={columns} />
        </tbody>
      </table>
    )
  };

};


