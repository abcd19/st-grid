
import { renderRows } from './renderRows';
import React from 'react';
import { typeItem, typeColumn } from './../GridLayout'
import { tyepCellVal } from './CellLayout'

export interface IItemsLayoutProps {
  columns: typeColumn[];
  firstVisibleRowI: number;
  height: number;
  items: typeItem[];
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void,
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void
}

export const CELL_HEIGHT = 30;
export const SCROLL_PLACE = 20;
export const MIN_COL_WIDTH = 100;

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