import * as ST from '../../common'
import { CELL_HEIGHT } from './constants';



export function onItemScrollX(this: any) {
  //TODO: use state instead refs
  var scroll = this.scrollBottomRef.current.scrollLeft;
  this.bodyDivRef.current.scrollLeft = scroll;
  this.headerDivRef.current.scrollLeft = scroll;
}


export function onItemScrollY(this: any) {

  let curScroll = this.scrollRightRef.current.scrollTop;
  let newScroll = curScroll;

  // max scroll value
  let maxScroll = this.scrollRightRef.current.scrollHeight - this.scrollRightRef.current.offsetHeight;

  // dont scroll above
  if (newScroll < 0) {
    newScroll = 0;
  }

  // calc first visible row
  let newFirstVisibleRow = Math.floor(newScroll / CELL_HEIGHT);

  // case then we scroll to the end
  if (newScroll == maxScroll) {
    // scroll value was less  then row height
    if (newScroll < CELL_HEIGHT) {
      // scroll to the end
      newFirstVisibleRow = newFirstVisibleRow + 1;
    }

  }


  this.setState({ firstVisibleRowI: newFirstVisibleRow });
}


/* scroll mouse whell handler */
export function onItemMouseWheelScrollingY(this: any, e: any) {

  //how badly the wheel sank
  let delta = e.deltaY;

  //determine the value of the previous scroll
  let curScroll = this.scrollRightRef.current.scrollTop;

  //whatever the size of the scroll, we always scroll by the size of the Row
  let newScroll;

  //maximum possible scrolling
  let maxScroll = this.scrollRightRef.current.scrollHeight - this.scrollRightRef.current.offsetHeight;

  //scroll strictly 2 row (down or top)
  //in several browsers scroll works different
  //Firefox have scrolled  3 pxs, Chrome 100pxs by one mouse move
  if (delta > 0) {
    delta = CELL_HEIGHT * 2;
  } else {
    delta = -1 * (CELL_HEIGHT * 2)
  }


  //scroll down
  if (delta > 0) {
    // if scroll is in the botttom dont scroll anymore
    if (curScroll == maxScroll) {
      return;
    }

    newScroll = curScroll + Math.abs(delta);

    //don't scroll above
    if (newScroll > maxScroll) {
      newScroll = maxScroll;
    }


    //scrol top
  } else {
    newScroll = curScroll - Math.abs(delta);
    //don't scroll then value less than zero
    if (newScroll < 0) {
      newScroll = 0;
    }

    // if we on top of the scroll doesn't scroll anymore
    if (curScroll == 0) {
      return;
    }
  }

  this.scrollRightRef.current.scrollTop = newScroll;

  //rerender all visieble rows in Items
  let newFirstVisibleRow = Math.floor(newScroll / CELL_HEIGHT);

  // case then scroll to the end
  if (newScroll == maxScroll) {
    // scroll value was less  then row height
    if (newScroll < CELL_HEIGHT) {
      // scroll to end
      newFirstVisibleRow = newFirstVisibleRow + 1;
    }

  }


  this.setState({ firstVisibleRowI: newFirstVisibleRow });

}


export function onChangeHeaderCellWidth(this: any, cellAlias: string, width: number) {
  let { columns } = this.props;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i]['alias'] == cellAlias) {
      columns[i]['widthPix'] = width;
      this.setState({ columns: columns });
      return;
    }
  }
}