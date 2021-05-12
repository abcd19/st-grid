import React from 'react';
import { onChangeType } from "./InputLayout";
import { IImgButtonLayoutProps } from "./ImgButtonLayout";
export interface IImgFieldLayoutEditBtn {
    items: Array<{
        name: string;
        settings: IImgButtonLayoutProps;
    }>;
}
export interface IFieldLayoutEditProps {
    readOnly?: boolean;
    inputReadOnly?: boolean;
    inputVal?: string;
    onChange?: onChangeType;
    onChangeDelay?: onChangeType;
    buttons?: IImgFieldLayoutEditBtn;
    clearBtnFlag?: boolean;
    prepareGridDisplay?: boolean;
}
export declare const FieldLayoutEdit: React.FC<IFieldLayoutEditProps>;
