import * as ST from '../common';
import React from 'react';

import { HeaderLayout } from './Header/HeaderLayout';
import { ItemsLayout, CELL_HEIGHT } from './Items/ItemsLayout';
import { ToolbarLayout } from './Toolbar/ToolbarLayout'
import { calcSumColumnsWidth } from './calcSumColumnsWidth';
import './GridLayout.scss'
import { onItemScrollX, onItemScrollY, onItemMouseWheelScrollingY, onChangeHeaderCellWidth } from './handle'
import {IToolbarLayoutProps} from './Toolbar/ToolbarLayout';
import {IStringFldLayoutEditProps} from './../StringFld/StringFldLayoutEdit';
import {IComboboxFldLayoutEditProps/*, ComboboxFldLayoutEdit*/} from './../ComboboxFld/ComboboxFldLayoutEdit';
import {ICheckboxFldLayoutEditProps/*, CheckboxFldLayoutEdit*/} from './../CheckboxFld/CheckboxFldLayoutEdit';
//import {ComboboxFldCell, IComboboxFldCellProps} from './../ComboboxFld/ComboboxFldCell';
//import {CheckboxFldCell, ICheckboxFldCellProps} from './../CheckboxFld/CheckboxFldCell';
import {StringFldCell/*, StringFldCellProps*/} from './../StringFld/StringFldCell';
import {tyepCellVal} from './Items/Cell/CellLayout'


export type typeTypeColumn = {
  constr: React.ComponentType<
  {
    layoutMode?: string; style: React.CSSProperties; widthPix: number; val: tyepCellVal;
    settings: IStringFldLayoutEditProps | IComboboxFldLayoutEditProps | ICheckboxFldLayoutEditProps ;
    onChangeItem: (val: tyepCellVal) => void;
    onMouseDownItem: ()=>void;
    onMouseLeaveItem: ()=>void;
    onMouseEnterItem: ()=> void;
    onDoubleClickItem: ()=>void;
    onClickItem: ()=>void;
    rowItem: typeItem;
    className: string
  }>;
  settings: IStringFldLayoutEditProps | IComboboxFldLayoutEditProps | ICheckboxFldLayoutEditProps 
}

export type typeColumn = {
  title: string,
  alias: string,
  widthPix: number,
  type: typeTypeColumn,
  visible: boolean
}


export type typeItem = {
  data: Record<string, tyepCellVal>,
  rowNum?: number,
  layoutMode?: string,
  color?: string
}


export interface IGridLayoutProps {
  onClickHeaderCell: (alias: string, order?: string) => void;
  scrollToLastItem: boolean;
  columns: typeColumn[];
  items:  typeItem[];
  height: number;
  width: number;
  sortingFlag: boolean;
  toolbar: IToolbarLayoutProps;
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseLeaveItem: (rowObject: typeItem, cellAlias: string) => void,
  onDoubleClickItem: (rowObject: typeItem, cellAlias: string) => void;
  onClickItem: (rowObject: typeItem, cellAlias: string) => void;
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
}

export interface IGridLayoutState {
  scrollToLastItem: boolean;
}

/** grid */
export class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {

  private SCROLL: number;
  private HEADER_HEIGHT: number;
  private TOOLBAR_HEIGHT: number;
  private scrollBottomRef: React.RefObject<HTMLDivElement>;
  private scrollRightRef: React.RefObject<HTMLDivElement>;
  private bodyDivRef: React.RefObject<HTMLDivElement>;
  private headerDivRef: React.RefObject<HTMLDivElement>;
  private onItemScrollX: () => void;
  private onItemMouseWheelScrollingY: (this: GridLayout, e: React.WheelEvent) => void;
  private onItemScrollY: () => void;
  private onChangeHeaderCellWidth: (this: GridLayout, cellAlias: string, width: number) => void;
  private firstVisibleRowI: number;


  constructor(props: IGridLayoutProps) {
    super(props);
    this.SCROLL = 20;
    this.TOOLBAR_HEIGHT = 34;
    this.HEADER_HEIGHT = 30;
    this.firstVisibleRowI = 0;
    this.state = {
      scrollToLastItem: false,
    }

    this.scrollBottomRef = React.createRef();
    this.scrollRightRef = React.createRef();
    this.bodyDivRef = React.createRef();
    this.headerDivRef = React.createRef();

    this.onItemScrollX = onItemScrollX.bind(this);
    this.onItemMouseWheelScrollingY = onItemMouseWheelScrollingY.bind(this);
    this.onItemScrollY = onItemScrollY.bind(this);
    this.onChangeHeaderCellWidth = onChangeHeaderCellWidth.bind(this);

    this.onClickHeaderCell = this.onClickHeaderCell.bind(this);
  }


  onClickHeaderCell(alias: string, order?: string): void {
    if (ST.isFunction(this.props.onClickHeaderCell)) {
      this.props.onClickHeaderCell(alias, order);
    }
  }

  componentDidMount(): void {

    // so that the page in chrom does not spin, disable the scroll with the passive: false flag
    const prevDef = (e: Event) => e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    if (this.bodyDivRef && this.bodyDivRef.current) {
      if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        this.bodyDivRef.current.addEventListener("wheel", prevDef, { passive: false });
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        this.bodyDivRef.current.addEventListener("mousewheel", prevDef, { passive: false });
      } else {
        // Firefox < 17
        this.bodyDivRef.current.addEventListener("MozMousePixelScroll", prevDef, { passive: false });
      }
    }

    this.prepareScrollToLastItem();
  }

  componentDidUpdate(): void {
    this.prepareScrollToLastItem();
  }

  //todo 
  prepareScrollToLastItem(): void {
    if (this.props.scrollToLastItem === true && this.scrollRightRef && this.scrollRightRef.current) {
      let newScroll = this.firstVisibleRowI * CELL_HEIGHT;
      newScroll = newScroll + CELL_HEIGHT;
      this.scrollRightRef.current.scrollTop = newScroll;
    }
  }

  render(): React.ReactElement {
    const { columns, items } = this.props;
    for (let i = 0; i < this.props.columns.length; i++) {
      ST.defaults(columns[i],
        {
          widthPix: 100,
          visible: true,
          type: {
            constr: StringFldCell,
            settings: {}
          }
        });

      if (columns[i]['visible'] == false) {
        columns[i]['widthPix'] = 0;
      }
    }

    const width = this.props.width - this.SCROLL;
    let rightScrollHeight = items.length * CELL_HEIGHT;
    const bodyContentHeight = this.props.height - this.SCROLL - this.TOOLBAR_HEIGHT - this.HEADER_HEIGHT;
    const bodyContentWidth = calcSumColumnsWidth(this.props.columns);

    // one line can be added to this height for the beauty of display at the end of the lines
    // add another line to the body
    // one more empty invisible line free-spaceTr with a height of 30 is added to the end of the lines
    if (rightScrollHeight > bodyContentHeight) {
      rightScrollHeight = rightScrollHeight + CELL_HEIGHT;
    }

    if (this.props.scrollToLastItem === true) {
      const visibleRowsCount = Math.ceil(bodyContentHeight / CELL_HEIGHT);

      this.firstVisibleRowI = items.length - visibleRowsCount + 1;

    }

    // the case when the height of the table was changed and all the rows fit
    if (bodyContentHeight > rightScrollHeight) {
      this.firstVisibleRowI = 0;
    }

    return (<table className="st-grid-layout">
      <tbody>
        <tr>
          <td>
            <div style={{ marginBottom: "2px", width: width }} className="st-grid-toolbar-div">
              <ToolbarLayout items={this.props.toolbar.items} />
            </div>
          </td>
          <td className="st-grid-toolbar-rightScroll"></td>
        </tr>
        <tr>
          <td className="st-grid-header-td">
            <div className="st-grid-header-div" ref={this.headerDivRef} style={{ height: '32px', width: width }}>
              <div className="st-grid-header-content-div" style={{ height: '32px', width: bodyContentWidth + 'px' }}>
                <HeaderLayout clickHeaderCell={this.onClickHeaderCell} sortingFlag={this.props.sortingFlag} columns={columns} onChangeHeaderCellWidth={this.onChangeHeaderCellWidth} />
              </div>
            </div>
          </td>
          <td className="st-grid-header-rightScroll"></td>
        </tr>
        <tr>
          <td className="st-grid-body-td">
            <div onWheel={this.onItemMouseWheelScrollingY} ref={this.bodyDivRef} className="st-grid-body-div" style={{ width: width, height: bodyContentHeight }}>
              <div className="st-grid-body-content-div" style={{ width: bodyContentWidth + 'px' }}>
                <ItemsLayout
                  columns={columns}
                  onMouseDownItem={this.props.onMouseDownItem}
                  onMouseEnterItem={this.props.onMouseEnterItem}
                  onMouseLeaveItem={this.props.onMouseLeaveItem}
                  onDoubleClickItem={this.props.onDoubleClickItem}
                  onClickItem={this.props.onClickItem}
                  onChangeItem={this.props.onChangeItem}
                  items={items}
                  height={bodyContentHeight}
                  firstVisibleRowI={this.firstVisibleRowI} />
              </div>
            </div>
          </td>
          <td className="st-grid-body-rightScroll">
            <div onScroll={this.onItemScrollY} ref={this.scrollRightRef} className="st-grid-rightScroll-div" style={{ width: this.SCROLL + 'px', height: bodyContentHeight }}>
              <div style={{ height: rightScrollHeight }}></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div onScroll={this.onItemScrollX} ref={this.scrollBottomRef} className="st-grid-bottomScroll-div" style={{ height: this.SCROLL + 'px', width: width }}>
              <div className="st-grid-bottomScroll-content-div" style={{ height: this.SCROLL + 'px', width: bodyContentWidth + 'px' }}></div>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>);
  }

}
