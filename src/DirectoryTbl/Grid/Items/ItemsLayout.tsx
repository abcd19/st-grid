
import { renderRows } from './renderRows';
import React from 'react';
import { typeItem, TGridColumn } from './../GridLayout'
import { tyepCellVal } from './CellLayout'
import {CELL_HEIGHT} from './../constants';

export interface IItemsLayoutProps {
  columns: TGridColumn[];
  firstVisibleRowI: number;
  height: number;
  items: typeItem[];
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void,
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void
}


// set of rows
export class ItemsLayout extends React.Component<IItemsLayoutProps> {

  private renderRows: (props: IItemsLayoutProps) => React.ReactElement[];


  constructor(props: IItemsLayoutProps) {
    super(props);
    this.renderRows = renderRows.bind(this);
  }

  render(): React.ReactElement {
    const items = this.renderRows(this.props);

    const springRow = <tr className="free-spaceTr" key="free-spaceTr">
      <td colSpan={this.props['columns'].length} style={{ height: CELL_HEIGHT }}></td>
    </tr>;
    items.push(springRow);

    return (
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {items}
        </tbody>
      </table>
    )

  }
}