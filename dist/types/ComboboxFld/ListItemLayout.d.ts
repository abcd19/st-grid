import React from 'react';
export declare type typeVal = {
    raw?: string | number | boolean;
    display?: string | number | boolean;
};
export interface IListItemLayoutProps {
    setScroll?: boolean;
    itemsListWidthPix?: number;
    isSelected?: boolean;
    onClick?: (val: typeVal) => void;
    val?: typeVal;
}
export declare const ListItemLayout: React.FC<IListItemLayoutProps>;
