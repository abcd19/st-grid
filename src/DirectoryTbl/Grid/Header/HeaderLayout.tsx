
import {HeaderRowLayout} from './HeaderRowLayout';
import React from 'react';
import {TGridColumn} from './../../Grid/GridLayout'


export interface IHeaderLayoutProps {
  changeHeaderCellWidth: (cellAlias: string, width: number)=>void;
  clickHeaderCell: (alias: string, order?: string) => void
  columns: TGridColumn[];
  sortingFlag: boolean;
}

/* header */
export const HeaderLayout: React.FC<IHeaderLayoutProps> = (props: IHeaderLayoutProps) => {


 const columns = props['columns'];

  return(
    <table cellPadding="0" cellSpacing="0" className="st-innerTableLayout-table" style={{borderCollapse: "collapse"}}>
      <tbody>
        <HeaderRowLayout changeHeaderCellWidth={props.changeHeaderCellWidth} clickHeaderCell={props.clickHeaderCell} sortingFlag={props.sortingFlag} columns={columns} />
      </tbody>
    </table>
  )
}