import React from 'react';
import './Header.scss';
import { typeHandler } from './HeaderLayout';
export interface IHeaderCellLayoutProps {
    width: number;
    text: string;
    sortingFlag: boolean;
    handler: typeHandler;
    settings: {
        alias: string;
    };
}
export interface IHeaderCellLayoutState {
    startChord: number;
    cellWidthChangingNow: boolean;
    clientWidth: number;
    sortBadge: string;
}
export declare class HeaderCellLayout extends React.Component<IHeaderCellLayoutProps, IHeaderCellLayoutState> {
    private CELL_HEIGHT;
    private startChord;
    private width;
    /**
     * @constructor
     * @param {type} data
     */
    constructor(props: IHeaderCellLayoutProps);
    clickHeaderCellHandle(): void;
    anchorMouseDownHandle(e: React.MouseEvent): void;
    anchorMouseUpHandle(): void;
    anchorMouseMoveHandle(e: MouseEvent): void;
    render(): React.ReactElement;
}
