import React from 'react';
import { tyepCellVal } from './CellLayout';
import { typeColumn, typeItem } from '../GridLayout';
export interface IRowLayoutProps {
    onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
    onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void;
    onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void;
    onClickItem: (rowObject: typeItem, cellAlias: string) => void;
    item: typeItem;
    defaultColor: string;
    columns: typeColumn[];
    rowNum: number;
}
export declare class RowLayout extends React.Component<IRowLayoutProps> {
    private cells;
    constructor(props: IRowLayoutProps);
    onChangeItem(cellAlias: string, val: tyepCellVal): void;
    onMouseEnterItem(cellAlias: string): void;
    onMouseLeaveItem(cellAlias: string): void;
    onMouseDownItem(cellAlias: string): void;
    onDoubleClickItem(cellAlias: string): void;
    onClickItem(cellAlias: string): void;
    render(): React.ReactElement;
}
