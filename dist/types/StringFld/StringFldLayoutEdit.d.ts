import React from 'react';
export declare type tyepStringFldVal = string | undefined;
export interface IStringFldLayoutEditProps {
    onChangeDelay?: (val: string | undefined) => void;
    val?: tyepStringFldVal;
    clearBtnFlag?: boolean;
    onChange?: (val: string | undefined) => void;
    readOnly?: boolean;
    prepareGridDisplay?: boolean;
}
export declare const StringFldLayoutEdit: React.FC<IStringFldLayoutEditProps>;
