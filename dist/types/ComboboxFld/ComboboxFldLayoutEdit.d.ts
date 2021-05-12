import React from 'react';
import { typeComboValue } from './ListLayout';
export interface IComboboxFldLayoutEditProps {
    disableSearch?: boolean;
    readOnly?: boolean;
    onChange?: (val?: typeComboValue) => void;
    items: typeComboValue[];
    val?: typeComboValue;
    listWidthPix?: number;
    clearBtnFlag?: boolean;
    prepareGridDisplay?: boolean;
}
export interface IComboboxFldLayoutEditState {
    listIsOpened: boolean;
    cordLeft: number;
    cordTop: number;
    cordBtnLeft: number;
    cordBtnTop: number;
}
export declare class ComboboxFldLayoutEdit extends React.Component<IComboboxFldLayoutEditProps, IComboboxFldLayoutEditState> {
    private buttons;
    private refTable;
    static defaultProps: IComboboxFldLayoutEditProps;
    /**
     * @constructor
     */
    constructor(props: IComboboxFldLayoutEditProps);
    onClickChoiceHandle(e?: React.MouseEvent): void;
    onClickListElement(val?: typeComboValue): void;
    runClose(e: Event): void;
    findValByRawVal(rawVal: string | boolean | number): typeComboValue | undefined;
    render(): React.ReactElement;
}
