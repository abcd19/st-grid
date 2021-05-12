import React from 'react';
import './assets/LinearGroupLayout.scss';
import { IInputLayoutProps } from './InputLayout';
import { IImgButtonLayoutProps } from './ImgButtonLayout';
export interface ILinearGroupLayoutProps {
    children: Array<React.ReactElement<IImgButtonLayoutProps | IInputLayoutProps>>;
    height?: number;
    prepareGridDisplay?: boolean;
}
export declare class LinearGroupLayout extends React.Component<ILinearGroupLayoutProps> {
    constructor(props: ILinearGroupLayoutProps);
    render(): React.ReactElement;
}
