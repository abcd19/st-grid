import React from 'react';
import { IImgButtonLayoutProps } from './../../StringFld/ImgButtonLayout';
export interface IToolbarItem {
    name: string;
    widthPix: number;
    type: {
        constr: React.ComponentType<IImgButtonLayoutProps>;
        settings: IImgButtonLayoutProps;
    };
}
export interface IToolbarLayoutProps {
    items: IToolbarItem[];
}
export declare class ToolbarLayout extends React.Component<IToolbarLayoutProps> {
    constructor(props: IToolbarLayoutProps);
    render(): React.ReactElement;
}
