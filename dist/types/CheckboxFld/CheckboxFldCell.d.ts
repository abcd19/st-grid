import React from 'react';
export interface ICheckboxFldCellProps {
    layoutMode: string;
    style: React.CSSProperties;
    onMouseDownItem: (e: React.MouseEvent<HTMLTableCellElement>) => void;
    className: string;
    settings: {
        readOnly: boolean;
    };
    onChangeItem: (val: boolean) => void;
    val: boolean | undefined;
}
export declare const CheckboxFldCell: React.FC<ICheckboxFldCellProps>;
