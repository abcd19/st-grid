import React from 'react';
import './Checkbox.scss';
declare type onChangeType = (val: boolean) => void;
export declare type tyepCheckboxFldVal = boolean | undefined;
export interface ICheckboxFldLayoutEditProps {
    onChange?: onChangeType;
    readOnly?: boolean;
    val?: tyepCheckboxFldVal;
}
export declare class CheckboxFldLayoutEdit extends React.Component<ICheckboxFldLayoutEditProps> {
    static defaultProps: ICheckboxFldLayoutEditProps;
    private _val;
    constructor(props: ICheckboxFldLayoutEditProps);
    onClickHandle(): void;
    render(): React.ReactNode;
}
export {};
