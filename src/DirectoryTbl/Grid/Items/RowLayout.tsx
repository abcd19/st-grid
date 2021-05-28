import { CellLayout } from './CellLayout';
import React from 'react';
import { tyepCellVal } from './CellLayout'
import { TGridColumn, typeItem } from '../GridLayout'
import {StringFldCell} from '../../../StringFld/StringFldCell'


export interface IRowLayoutProps {
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void,
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void,
  item: typeItem,
  defaultColor: string,
  columns: TGridColumn[],
  rowNum: number,
}


/* row of the table */
export class RowLayout extends React.Component<IRowLayoutProps> {

  constructor(props: IRowLayoutProps) {
    super(props);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
  }

  onChangeItem(cellAlias: string, val: tyepCellVal): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onChangeItem'].apply(self, [rowObject, cellAlias, val])
  }


  onMouseDownItem(cellAlias: string): void {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseDownItem'].apply(this, [rowObject, cellAlias])
  }


  render(): React.ReactElement {

    const cells: React.ReactElement[] = [];

    for (let i = 0; i < this.props.columns.length; i++) {
      const { visible, type, alias, widthPix} = this.props['columns'][i];

      if (visible === false) {
        continue
      }

      const {item:{layoutMode = 'view', color = undefined, data = {}}} = this.props;
      const val = this.props.item['data'][alias];

      const newCell = <CellLayout
        color={color}
        onChangeItem={this.onChangeItem}
        onMouseDownItem={this.onMouseDownItem}
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


