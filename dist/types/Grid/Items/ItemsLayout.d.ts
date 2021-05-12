import React from 'react';
import { typeItem, typeColumn } from './../GridLayout';
import { tyepCellVal } from './CellLayout';
export interface IItemsLayoutProps {
    columns: typeColumn[];
    firstVisibleRowI: number;
    height: number;
    items: typeItem[];
    onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
    onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void;
    onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void;
    onClickItem: (rowObject: typeItem, cellAlias: string) => void;
}
declare class ItemsLayout extends React.Component<IItemsLayoutProps> {
    private renderRows;
    constructor(props: IItemsLayoutProps);
    render(): React.ReactElement;
}
declare const CELL_HEIGHT = 30;
declare const SCROLL_PLACE = 20;
declare const MIN_COL_WIDTH = 100;
export { ItemsLayout, CELL_HEIGHT, SCROLL_PLACE, MIN_COL_WIDTH };
