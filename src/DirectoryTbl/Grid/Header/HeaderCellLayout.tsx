import * as ST from '../../../common';
import {CELL_HEIGHT} from './../constants';
import React from 'react';
import css from './Header.scss'

const ARR_DOWN = '&#8595;', ARR_UP = '&#8593;', ARR_NONE = '';

export interface IHeaderCellLayoutProps {
  width: number;
  title: string;
  sortingFlag: boolean;
  clickHeaderCell: (alias: string, mark?: string) => void;
  changeHeaderCellWidth: (alias: string, newWidth: number) => void;
  alias: string;
}

export interface IHeaderCellLayoutState {
  sortBadge: string
}


/* cell of header */
export class HeaderCellLayout extends React.PureComponent<IHeaderCellLayoutProps, IHeaderCellLayoutState> {

  /**
   * @constructor
   * @param {type} data
   */
  constructor(props: IHeaderCellLayoutProps) {
    super(props);

    this.state = {
      sortBadge: ARR_NONE
    };

    this.anchorMouseDownHandle = this.anchorMouseDownHandle.bind(this);
    this.anchorMouseMoveHandle = this.anchorMouseMoveHandle.bind(this);
    this.anchorMouseUpHandle = this.anchorMouseUpHandle.bind(this);
    this.clickHeaderCellHandle = this.clickHeaderCellHandle.bind(this);

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

      if (ST.isFunction(this.props['clickHeaderCell'])) {
        let mark = undefined;
        if (newSortBadge == ARR_UP) {
          mark = 'smallestfirst';
        } else if (newSortBadge == ARR_DOWN) {
          mark = 'biggestfirst';
        }

        this.props['clickHeaderCell'](this.props.alias, mark);
      }
    })

  }



  anchorMouseDownHandle(e: React.MouseEvent): void {
    window.document.addEventListener('mousemove', this.anchorMouseMoveHandle, true);
    window.document.addEventListener('mouseup', this.anchorMouseUpHandle, true);
  }

  anchorMouseUpHandle(e: MouseEvent): void {

    e.stopPropagation();

    window.document.removeEventListener('mousemove', this.anchorMouseMoveHandle, true);
    window.document.removeEventListener('mouseup', this.anchorMouseUpHandle, true);
  }

  anchorMouseMoveHandle(e: MouseEvent): void {

    e.stopPropagation();

    if (typeof (this.props['changeHeaderCellWidth']) == 'function') {
      if (this.props.width > 20) {
        this.props['changeHeaderCellWidth'](this.props.alias, this.props.width + e.movementX);
      }
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousemove', this.anchorMouseMoveHandle, true);
    window.document.removeEventListener('mouseup', this.anchorMouseUpHandle, true);
  }


  render(): React.ReactElement {
    console.log('render')
    const cellHeight = String(CELL_HEIGHT - 1) + 'px';

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
          <div onClick={this.clickHeaderCellHandle} style={{ height: cellHeight, lineHeight: cellHeight, width: this.props.width - bagWidthCoef + 'px' }} className={css.headCellTextContainer} >{this.props.title}</div>
          {sortState}
          <div onMouseDown={this.anchorMouseDownHandle} style={{ height: cellHeight, width: '5px' }} className={css.widthChangeAnchor}></div>
          <div style={{ clear: "left" }}></div>
        </div>
      </td>)
  }
}

