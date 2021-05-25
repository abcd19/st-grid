import * as ST from '../../../common'
import React from 'react';
import css from './Header.scss'
import {typeHandler} from './HeaderLayout';

const ARR_DOWN = '&#8595;', ARR_UP = '&#8593;', ARR_NONE = '';


export interface IHeaderCellLayoutProps {
  width: number;
  text: string;
  sortingFlag: boolean;
  handler: typeHandler;
  settings: {
    alias: string
  }
}

export interface IHeaderCellLayoutState {
  startChord: number;
  cellWidthChangingNow: boolean;
  clientWidth: number;
  sortBadge: string
}

/* cell of header */
export class HeaderCellLayout extends React.Component<IHeaderCellLayoutProps, IHeaderCellLayoutState> {

  private CELL_HEIGHT: number;
  private startChord: number;
  private width: number;


  /**
   * @constructor
   * @param {type} data
   */
  constructor(props: IHeaderCellLayoutProps) {
    super(props);

    this.state = {
      startChord: 0,
      cellWidthChangingNow: false,
      clientWidth: this.props.width,
      sortBadge: ARR_NONE
    };

    this.CELL_HEIGHT = 30;

    this.anchorMouseDownHandle = this.anchorMouseDownHandle.bind(this);
    this.anchorMouseMoveHandle = this.anchorMouseMoveHandle.bind(this);
    this.anchorMouseUpHandle = this.anchorMouseUpHandle.bind(this);
    this.clickHeaderCellHandle = this.clickHeaderCellHandle.bind(this);

    this.startChord = 0;
    this.width = this.props.width;
  }



  clickHeaderCellHandle(): void {
    if (this.props.sortingFlag !== true) {
      return;
    }

    const { sortBadge } = this.state;
    let newSortBadge = ARR_NONE;

    switch (sortBadge) {
      case ARR_NONE:
        newSortBadge = ARR_DOWN;
        break;

      case ARR_DOWN:
        newSortBadge = ARR_UP;
        break;

      case ARR_UP:
        newSortBadge = ARR_NONE;
        break;
    }

    this.setState({ sortBadge: newSortBadge }, () => {

      if (ST.isFunction(this.props['handler']['clickHeaderCell'])) {
        let mark = undefined;
        if (newSortBadge == ARR_UP) {
          mark = 'smallestfirst';
        } else if (newSortBadge == ARR_DOWN) {
          mark = 'biggestfirst';
        }

        this.props['handler']['clickHeaderCell'](this.props['settings']['alias'], mark);
      }
    })

  }



  anchorMouseDownHandle(e: React.MouseEvent): void {
    window.document.addEventListener('mousemove', this.anchorMouseMoveHandle);
    window.document.addEventListener('mouseup', this.anchorMouseUpHandle);

    this.setState({
      startChord: e.pageX,
      clientWidth: this.props.width,
      cellWidthChangingNow: true
    });
  }

  anchorMouseUpHandle(): void {
    window.document.removeEventListener('mousemove', this.anchorMouseMoveHandle);
    window.document.removeEventListener('mouseup', this.anchorMouseUpHandle);
    this.setState({
      cellWidthChangingNow: false
    });
  }

  anchorMouseMoveHandle(e: MouseEvent): void {
    if (this.state.cellWidthChangingNow == false) {
      return;
    }

    if (typeof (this.props['handler']['changeHeaderCellWidth']) == 'function') {
      const moveX = e.pageX - this.state.startChord;
      const newWidth = this.state.clientWidth + moveX;
      if (this.state.clientWidth + moveX > 20) {
        this.props['handler']['changeHeaderCellWidth'](this.props.settings.alias, newWidth);
      }
    }
  }

  render(): React.ReactElement
  {
    const cellHeight = String(this.CELL_HEIGHT - 1) + 'px';
    this.width = this.props.width;


    const { sortBadge } = this.state;

    let sortState = undefined;
    let bagWidthCoef = 12;
    if (sortBadge == ARR_UP || sortBadge == ARR_DOWN) {
      sortState = <div style={{ height: cellHeight, fontSize: '12pt', fontFamily: 'Tahoma', width: '10px', float: 'left', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: sortBadge }} className="st-grid-head-cell-sortAnchor"></div>
      bagWidthCoef = 22;
    }

    return (
      <td className={css.headerCell} style={{ boxSizing: "border-box", width: this.props.width + 'px' }}>
        <div style={{ height: cellHeight }} className="st-grid-head-cell-general">
          <div onClick={this.clickHeaderCellHandle} style={{ height: cellHeight, lineHeight: cellHeight, width: this.props.width - bagWidthCoef + 'px' }} className={css.headCellTextContainer} >{this.props.text}</div>
          {sortState}
          <div onMouseDown={this.anchorMouseDownHandle} style={{ height: cellHeight, width: '5px' }} className={css.widthChangeAnchor}></div>
          <div style={{ clear: "left" }}></div>
        </div>
      </td>)
  }
}

