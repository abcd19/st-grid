import React from 'react';
import { typeColumn } from './../../Grid/GridLayout';
import { typeHandler } from './HeaderLayout';
export interface IeaderRowLayoutProps {
    columns: typeColumn[];
    handler: typeHandler;
    sortingFlag: boolean;
}
export declare class HeaderRowLayout extends React.Component<IeaderRowLayoutProps> {
    constructor(props: IeaderRowLayoutProps);
    render(): React.ReactElement;
}
