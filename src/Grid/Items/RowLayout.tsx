import { CellLayout } from './CellLayout';
import React from 'react';
import { tyepCellVal } from './CellLayout'
import { typeColumn, typeItem } from '../GridLayout'
import {StringFldCell} from '../../StringFld/StringFldCell'


export interface IRowLayoutProps {
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void,
  onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void,
  onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void,
  onClickItem: (rowObject: typeItem, cellAlias: string) => void,
  item: typeItem,
  defaultColor: string,
  columns: typeColumn[],
  rowNum: number,
}

/* row of the table */
export class RowLayout extends React.Component<IRowLayoutProps> {

  private cells: React.ReactElement[];

  constructor(props: IRowLayoutProps) {
    super(props);
    this.cells = [];
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);
    this.onDoubleClickItem = this.onDoubleClickItem.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  onChangeItem(cellAlias: string, val: tyepCellVal): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onChangeItem'].apply(self, [rowObject, cellAlias, val])
  }

  onMouseEnterItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseEnterItem'].apply(self, [rowObject, cellAlias])
  }

  onMouseLeaveItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseLeaveItem'].apply(self, [rowObject, cellAlias])
  }

  onMouseDownItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseDownItem'].apply(this, [rowObject, cellAlias])
  }

  onDoubleClickItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onDoubleClickItem'].apply(this, [rowObject, cellAlias])
  }

  onClickItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onClickItem'].apply(this, [rowObject, cellAlias])
  }


  render(): React.ReactElement {
    const cells = [];
    for (let i = 0; i < this.props.columns.length; i++) {
      const { visible, type = {constr: StringFldCell,settings: {}}, alias, widthPix = 100 } = this.props['columns'][i];

      if (visible === false) {
        continue
      }

      const {item:{layoutMode = 'view', color = undefined, data = {}}} = this.props;
      const val = this.props.item['data'][alias];

      const newCell = <CellLayout
        color={color}
        onChangeItem={this.onChangeItem}
        onMouseDownItem={this.onMouseDownItem}
        onMouseEnterItem={this.onMouseEnterItem}
        onMouseLeaveItem={this.onMouseLeaveItem}
        onDoubleClickItem={this.onDoubleClickItem}
        onClickItem={this.onClickItem}
        layoutMode={layoutMode}
        type={type}
        alias={alias}
        rowItem={this.props.item}
        rowNum={this.props.rowNum}
        val={val}
        defaultColor={this.props.defaultColor}
        widthPix={widthPix}
        key={alias} />;

      cells.push(newCell);
    }

    return (
      <tr>
        { cells}
        <td className='st-grid-head-cell-freeSpace'></td>
      </tr>);
  }

}


