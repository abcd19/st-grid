import { DirectoryTbl } from './DirectoryTbl';
import { typeItem } from './../Grid/GridLayout';
import { tyepCellVal } from './../Grid/Items/CellLayout';
export declare function onChangeItem(this: DirectoryTbl, item: typeItem, cellAlias: string, newVal: tyepCellVal): void;
export declare function onClickHeaderCell(this: DirectoryTbl, sortingCellAlias: string, orderSorting?: string): void;
export declare function onMouseDownItem(this: DirectoryTbl, item: typeItem): void;
