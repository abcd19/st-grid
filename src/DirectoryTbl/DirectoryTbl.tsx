import React from 'react'
import { GridLayout, IToolbarLayoutProps, typeColumn, typeItem, tyepCellVal } from './../Grid'
import { onChangeItem, onMouseDownItem, onClickHeaderCell } from './DirectoryTblHandle'
import { sortItems } from './Sorting/sortItems';
import * as ST from '../common'
import { createDirectoryTableToolbar } from './Toolbar/createDirectoryTableToolbar';

export interface IDirectoryTblProps {
  height?: number;
  width?: number;
  sortingFlag?: boolean;
  items?: typeItem[];
  addBtnFlag?: boolean;
  removeBtnFlag?: boolean;
  removeAllBtnFlag?: boolean;
  onMouseEnterItem?: (rowObject: typeItem, cellAlias: string) => void,
  onMouseLeaveItem?: (rowObject: typeItem, cellAlias: string) => void,
  onDoubleClickItem?: (rowObject: typeItem, cellAlias: string) => void;
  onRemoveAllItems?: () => void;
  onSelectItem?: (item?: typeItem, num?: number) => void;
  onChange?: (newItems: typeItem[], obj: { event: string, removedItem?: typeItem, selItemNum?: number, cellAlias?: string, newVal?: tyepCellVal }) => void;
  columns: typeColumn[];
}


export interface IDirectoryTblState {
  scrollToLastItem: boolean;
  sorting?: {
    order: string | undefined,
    cellAlias: string;
  };
  selItemNum?: number;
}

export class DirectoryTbl extends React.Component<IDirectoryTblProps, IDirectoryTblState>{

  static defaultProps = {
    height: 200,
    width: 400,
    sortingFlag: true,
    items: []
  };

  private onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
  public onChange: () => void = () => {/* do nothing */ };
  public onRemoveBtnClick: () => void = () => {/* do nothing */ };
  public onAddBtnClick: () => void = () => {/* do nothing */ };
  private onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void;
  private onClickHeaderCell: (sortingCellAlias: string, orderSorting?: string) => void;
  private toolbar: IToolbarLayoutProps

  constructor(props: IDirectoryTblProps) {
    super(props);

    this.onChangeItem = onChangeItem.bind(this);
    this.onMouseDownItem = onMouseDownItem.bind(this);
    this.onClickHeaderCell = onClickHeaderCell.bind(this);


    this.toolbar = createDirectoryTableToolbar(this);

    this.state = {
      selItemNum: undefined,
      sorting: undefined,
      scrollToLastItem: false,
    }

  }


  render(): React.ReactElement {

    const { height = 200, width = 400, columns, sortingFlag = true } = this.props;
    const {
      onMouseEnterItem = () => {/* do nothing */ },
      onMouseLeaveItem = () => {/* do nothing */ },
      onDoubleClickItem = () => {/* do nothing */ }
    } = this.props;

    const { scrollToLastItem, sorting, selItemNum } = this.state;
    let { items = [] } = this.props

    for (const item of items) {
      item.color = undefined;
      item.layoutMode = 'view';
    }


    if (typeof (selItemNum) == 'number') {

      if (ST.isObject(items[selItemNum])) {

        items[selItemNum].color = '#EDF5FC';
        items[selItemNum].layoutMode = 'edit';
      }

    }

    if (sorting && ST.isString(sorting.order)) {
      items = sortItems(ST.clone(items), sorting.cellAlias, sorting.order);
    }



    return <GridLayout
      scrollToLastItem={scrollToLastItem}
      width={width}
      height={height}
      onChangeItem={this.onChangeItem}
      onMouseDownItem={this.onMouseDownItem}
      onClickHeaderCell={this.onClickHeaderCell}
      onMouseEnterItem={onMouseEnterItem}
      onMouseLeaveItem={onMouseLeaveItem}
      onDoubleClickItem={onDoubleClickItem}
      onClickItem={() => {/* do nothing */ }}
      sortingFlag={sortingFlag}
      toolbar={this.toolbar}
      items={items}
      columns={columns} />
  }
}