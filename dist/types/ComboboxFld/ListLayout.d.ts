import React from 'react';
export declare const WIDTH = 300;
export declare const LIST_ITEM_WIDTH: number;
export declare const MAXHEIGHT = 250;
export declare type typeComboValue = {
    raw?: string | number | boolean;
    display?: string | number | boolean;
};
export interface IListLayoutProps {
    handler: {
        change: (val?: typeComboValue) => void;
    };
    items: typeComboValue[];
    cordBtnLeft: number;
    cordBtnTop: number;
    listWidthPix: number;
    disableSearch?: boolean;
    selectedVal?: string | number | boolean;
}
export interface IListLayoutState {
    isFiltred: boolean;
    filterdItems: typeComboValue[];
}
export declare class ListLayout extends React.Component<IListLayoutProps, IListLayoutState> {
    private genDiv;
    /**
     * @constructor
     * @param {type} data
     */
    constructor(props: IListLayoutProps);
    clickItemHandle(val?: typeComboValue): void;
    changeSearchHandle(val?: string): void;
    componentDidMount(): void;
    render(): React.ReactElement;
}
