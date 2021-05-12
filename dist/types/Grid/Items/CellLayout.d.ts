import React from 'react';
import './Cell.scss';
import { tyepStringFldVal } from './../../StringFld/StringFldLayoutEdit';
import { typeComboValue } from './../../ComboboxFld/ListLayout';
import { tyepCheckboxFldVal } from './../../CheckboxFld/CheckboxFldLayoutEdit';
import { typeItem, typeTypeColumn } from './../GridLayout';
export declare type tyepCellVal = tyepStringFldVal | typeComboValue | tyepCheckboxFldVal;
export interface ICellLayoutProps {
    onMouseEnterItem: (alias: string) => void;
    onMouseLeaveItem: (alias: string) => void;
    onMouseDownItem: (alias: string) => void;
    onChangeItem: (cellAlias: string, val: tyepCellVal) => void;
    color?: string;
    widthPix: number;
    onDoubleClickItem: (cellAlias: string) => void;
    onClickItem: (cellAlias: string) => void;
    val: tyepCellVal;
    rowItem: typeItem;
    rowNum: number;
    type: typeTypeColumn;
    alias: string;
    display?: string;
    defaultColor: string;
    layoutMode?: string;
}
declare class CellLayout extends React.Component<ICellLayoutProps> {
    private background;
    private display;
    private _baseStyle;
    constructor(props: ICellLayoutProps);
    onMouseEnterItem(): void;
    onMouseLeaveItem(): void;
    onMouseDownItem(): void;
    onChangeItem(/*cellAlias: string,*/ val: tyepCellVal): void;
    onDoubleClickItem(): void;
    onClickItem(): void;
    render(): React.ReactElement;
}
export { CellLayout };
