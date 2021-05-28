import React from 'react';
import { HeaderLayout } from './Header';
import { ItemsLayout, tyepCellVal } from './Items';
import { CELL_HEIGHT, SCROLL_PLACE, TOOLBAR_HEIGHT, HEADER_HEIGHT } from './constants';
import { ToolbarLayout, IToolbarLayoutProps } from './Toolbar'
import { calcSumColumnsWidth } from './calcSumColumnsWidth';
import { onItemScrollX, onItemScrollY, onItemMouseWheelScrollingY, onChangeHeaderCellWidth } from './handle'
import { StringFldCell } from '../../StringFld/StringFldCell';
import {TDirectoryTblColumn} from './../DirectoryTbl';
import './GridLayout.scss'


export type TGridColumn = {
  title: string,
  alias: string,
  widthPix: number,
  type: TGridColumnType,
  visible: boolean
}


export type TGridColumnType = {
  constr: any;
  settings: any;
}


export type typeItem = {
  data: Record<string, tyepCellVal>,
  rowNum?: number,
  layoutMode?: string,
  color?: string,
  propsI?: number
}


export interface IGridLayoutProps {
  onClickHeaderCell: (alias: string, order?: string) => void;
  scrollToLastItem: boolean;
  columns: TDirectoryTblColumn[];
  items: typeItem[];
  height: number;
  width: number;
  sortingFlag: boolean;
  toolbar: IToolbarLayoutProps;
  onMouseDownItem: (rowObject: typeItem, cellAlias: string) => void,
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal) => void;
}

export interface IGridLayoutState {
  scrollToLastItem: boolean;
  firstVisibleRowI: number;
}

/** grid */
export class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {


  private scrollBottomRef: React.RefObject<HTMLDivElement>;
  private scrollRightRef: React.RefObject<HTMLDivElement>;
  private bodyDivRef: React.RefObject<HTMLDivElement>;
  private headerDivRef: React.RefObject<HTMLDivElement>;
  private onItemScrollX: () => void;
  private onItemMouseWheelScrollingY: (this: GridLayout, e: React.WheelEvent) => void;
  private onItemScrollY: () => void;
  private onChangeHeaderCellWidth: (this: GridLayout, cellAlias: string, width: number) => void;

  constructor(props: IGridLayoutProps) {
    super(props);

    this.state = {
      scrollToLastItem: false,
      firstVisibleRowI: 0
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
    this.props.onClickHeaderCell(alias, order);
  }

  componentDidMount(): void {

    // so that the page in chrom does not spin, disable the scroll with the passive: false flag
    const prevDef = (e: Event) => e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    if (this.bodyDivRef && this.bodyDivRef.current) {
      if ('onwheel' in document) {
        this.bodyDivRef.current.addEventListener("wheel", prevDef, { passive: false });
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
      let newScroll = this.state.firstVisibleRowI * CELL_HEIGHT;
      newScroll = newScroll + CELL_HEIGHT;
      this.scrollRightRef.current.scrollTop = newScroll;
    }
  }

  render(): React.ReactElement {
    const { items } = this.props;
    let {firstVisibleRowI} = this.state;

    const columns: TGridColumn[] = this.props.columns.map((item, i) => {
      let { title = `cell_${i}`, alias = `cell_${i}`, widthPix = 100, type = { constr: StringFldCell, settings: {} }, visible = true } = item;

      if (visible == false) {
        widthPix = 0;
      }

      return { title, alias, widthPix, type, visible }
    });


    const width = this.props.width - SCROLL_PLACE;
    const bodyContentHeight = this.props.height - SCROLL_PLACE - TOOLBAR_HEIGHT - HEADER_HEIGHT;

    let rightScrollHeight = items.length * CELL_HEIGHT;
    const bodyContentWidth = calcSumColumnsWidth(columns);
    //console.dir(bodyContentWidth)
    // one line can be added to this height for the beauty of display at the end of the lines
    // add another line to the body
    // one more empty invisible line free-spaceTr with a height of 30 is added to the end of the lines
    if (rightScrollHeight > bodyContentHeight) {
      rightScrollHeight = rightScrollHeight + CELL_HEIGHT;
    }

    if (this.props.scrollToLastItem === true) {
      const visibleRowsCount = Math.ceil(bodyContentHeight / CELL_HEIGHT);

      firstVisibleRowI = items.length - visibleRowsCount + 1;

    }

    // the case when the height of the table was changed and all the rows fit
    if (bodyContentHeight > rightScrollHeight) {
      firstVisibleRowI = 0;
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
                <HeaderLayout clickHeaderCell={this.onClickHeaderCell} sortingFlag={this.props.sortingFlag} columns={columns} changeHeaderCellWidth={this.onChangeHeaderCellWidth} />
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
                  onChangeItem={this.props.onChangeItem}
                  items={items}
                  height={bodyContentHeight}
                  firstVisibleRowI={firstVisibleRowI} />
              </div>
            </div>
          </td>
          <td className="st-grid-body-rightScroll">
            <div onScroll={this.onItemScrollY} ref={this.scrollRightRef} className="st-grid-rightScroll-div" style={{ width: SCROLL_PLACE + 'px', height: bodyContentHeight }}>
              <div style={{ height: rightScrollHeight }}></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div onScroll={this.onItemScrollX} ref={this.scrollBottomRef} className="st-grid-bottomScroll-div" style={{ height: SCROLL_PLACE + 'px', width: width }}>
              <div className="st-grid-bottomScroll-content-div" style={{ height: SCROLL_PLACE + 'px', width: bodyContentWidth + 'px' }}></div>
            </div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>);
  }

}
