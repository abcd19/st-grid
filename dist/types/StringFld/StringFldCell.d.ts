import React from 'react';
export interface StringFldCellProps {
    layoutMode: string;
    style: React.CSSProperties;
    onMouseDownItem: () => void;
    onChangeItem: () => void;
    className: string;
    val: string | undefined;
    onMouseEnterItem: () => void;
    onDoubleClickItem: () => void;
    onMouseLeaveItem: () => void;
    onClickItem: () => void;
}
export declare const StringFldCell: React.FC<StringFldCellProps>;
