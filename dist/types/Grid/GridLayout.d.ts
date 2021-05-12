import React from 'react';
import { tyepCellVal } from './Items';
import { IToolbarLayoutProps } from './Toolbar';
import './GridLayout.scss';
import { IStringFldLayoutEditProps } from './../StringFld';
import { IComboboxFldLayoutEditProps } from './../ComboboxFld';
import { ICheckboxFldLayoutEditProps } from './../CheckboxFld';
export declare type typeTypeColumn = {
    constr: any;
    settings: IStringFldLayoutEditProps | IComboboxFldLayoutEditProps | ICheckboxFldLayoutEditProps;
};
export declare type typeColumn = {
    title: string;
    alias: string;
    widthPix?: number;
    type?: typeTypeColumn;
    visible?: boolean;
};
export declare type typeItem = {
    data: Record<string, tyepCellVal>;
    rowNum?: number;
    layoutMode?: string;
    color?: string;
    propsI?: number;
};
export interface IGridLayoutProps {
    onClickHeaderCell: (alias: string, order?: string) => void;
    scrollToLastItem: boolean;
    columns: typeColumn[];
    items: typeItem[];
    height: number;
    width: number;
    sortingFlag: boolean;
    toolbar: IToolbarLayoutProps;
    onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void;
    onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void;
    onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void;
    onClickItem: (rowObject: typeItem, cellAlias: string) => void;
    onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
}
export interface IGridLayoutState {
    scrollToLastItem: boolean;
}
/** grid */
export declare class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {
    private SCROLL;
    private HEADER_HEIGHT;
    private TOOLBAR_HEIGHT;
    private scrollBottomRef;
    private scrollRightRef;
    private bodyDivRef;
    private headerDivRef;
    private onItemScrollX;
    private onItemMouseWheelScrollingY;
    private onItemScrollY;
    private onChangeHeaderCellWidth;
    private firstVisibleRowI;
    constructor(props: IGridLayoutProps);
    onClickHeaderCell(alias: string, order?: string): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    prepareScrollToLastItem(): void;
    render(): React.ReactElement;
}
