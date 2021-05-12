import React from 'react';
import { onChangeType } from './../StringFld/InputLayout';
export interface ISearchFldLayoutEditProps {
    onSearchBtnClick: onChangeType;
    onChangeDelay?: onChangeType;
    val?: string;
}
export interface ISearchFldLayoutEditState {
    val?: string;
}
export declare class SearchFldLayoutEdit extends React.Component<ISearchFldLayoutEditProps, ISearchFldLayoutEditState> {
    private buttons;
    constructor(props: ISearchFldLayoutEditProps);
    onChange(newVal?: string): void;
    render(): React.ReactElement;
}
