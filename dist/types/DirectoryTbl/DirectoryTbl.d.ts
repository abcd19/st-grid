import React from 'react';
import { typeColumn, typeItem, tyepCellVal } from './../Grid';
export interface IDirectoryTblProps {
    height?: number;
    width?: number;
    sortingFlag?: boolean;
    items?: typeItem[];
    addBtnFlag?: boolean;
    removeBtnFlag?: boolean;
    onMouseEnterItem?: (rowObject: typeItem, cellAlias: string) => void;
    onMouseLeaveItem?: (rowObject: typeItem, cellAlias: string) => void;
    onDoubleClickItem?: (rowObject: typeItem, cellAlias: string) => void;
    onClickItem?: (rowObject: typeItem, cellAlias: string) => void;
    onSelectItem?: (item?: typeItem, num?: number) => void;
    onChange?: (newItems: typeItem[], obj: {
        event: string;
        removedItem?: typeItem;
        selItemNum?: number;
        cellAlias?: string;
        newVal?: tyepCellVal;
    }) => void;
    columns: typeColumn[];
}
export interface IDirectoryTblState {
    scrollToLastItem: boolean;
    selItemNum?: number;
}
export declare class DirectoryTbl extends React.Component<IDirectoryTblProps, IDirectoryTblState> {
    static defaultProps: {
        height: number;
        width: number;
        sortingFlag: boolean;
        items: never[];
    };
    private onChangeItem;
    onChange: () => void;
    onRemoveBtnClick: () => void;
    onAddBtnClick: () => void;
    private onMouseDownItem;
    private toolbar;
    constructor(props: IDirectoryTblProps);
    render(): React.ReactElement;
}
