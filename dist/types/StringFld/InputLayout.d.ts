import React from 'react';
import './assets/InputLinear.scss';
export declare type onChangeType = (val: string | undefined) => void;
export interface IInputLayoutProps {
    onChangeDelay?: onChangeType;
    onChange?: onChangeType;
    val?: string;
    readOnly?: boolean;
    placeholder?: string;
}
export declare class InputLayout extends React.Component<IInputLayoutProps> {
    static defaultProps: IInputLayoutProps;
    private onChangeDelayTimer;
    private inputRef;
    constructor(props: IInputLayoutProps);
    onChangeDelayTimerFunc(): void;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): React.ReactElement;
}
