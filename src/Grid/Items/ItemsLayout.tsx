
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
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void,
  onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void;
  onClickItem: (rowObject: typeItem, cellAlias: string) => void;
}


// set of rows
class ItemsLayout extends React.Component<IItemsLayoutProps> {

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


const CELL_HEIGHT = 30;
const SCROLL_PLACE = 20;
const MIN_COL_WIDTH = 100;
export { ItemsLayout, CELL_HEIGHT, SCROLL_PLACE, MIN_COL_WIDTH }

