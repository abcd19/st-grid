import React, { CSSProperties } from 'react';
import { typeComboValue } from './ListLayout';
export interface IComboboxFldCellProps {
    layoutMode?: string;
    style?: CSSProperties;
    onMouseDownItem?: () => void;
    onChangeItem?: (val?: typeComboValue) => void;
    className?: string;
    val?: typeComboValue;
    settings: {
        listWidthPix: number;
        items: typeComboValue[];
        clearBtnFlag: boolean;
    };
}
export declare const ComboboxFldCell: React.FC<IComboboxFldCellProps>;
