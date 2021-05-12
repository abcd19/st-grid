import React from 'react';
import './assets/sprite_24.css';
import './assets/sprite_32.css';
export interface IImgButtonLayoutProps {
    widthPix?: number;
    imageName?: string;
    title?: string;
    handler: {
        click: (e: React.MouseEvent<HTMLDivElement>) => void;
    };
    readOnly?: boolean;
}
interface IImgButtonLayoutState {
    className: string;
    backgroundColor: string;
}
export declare class ImgButtonLayout extends React.Component<IImgButtonLayoutProps, IImgButtonLayoutState> {
    static defaultProps: IImgButtonLayoutProps;
    constructor(props: IImgButtonLayoutProps);
    handlerClick(e: React.MouseEvent<HTMLDivElement>): void;
    handlerMouseDown(): void;
    handlerMouseUp(): void;
    handleLayoutLeave(): void;
    handleLayoutEnter(): void;
    render(): React.ReactElement;
}
export {};
