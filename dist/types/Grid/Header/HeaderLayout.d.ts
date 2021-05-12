import React from 'react';
import { typeColumn } from './../../Grid/GridLayout';
import { GridLayout } from './../GridLayout';
export declare type typeHandler = {
    changeHeaderCellWidth: (cellAlias: string, width: number) => void;
    clickHeaderCell: (alias: string, order?: string) => void;
};
export interface IHeaderLayoutProps {
    onChangeHeaderCellWidth: (this: GridLayout, cellAlias: string, width: number) => void;
    clickHeaderCell: (alias: string, order?: string) => void;
    columns: typeColumn[];
    sortingFlag: boolean;
}
export declare class HeaderLayout extends React.Component<IHeaderLayoutProps> {
    constructor(props: IHeaderLayoutProps);
    render(): React.ReactElement;
}
