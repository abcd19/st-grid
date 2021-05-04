import * as ST from '../../common';
import { RowLayout } from './Table/RowLayout'
import { CELL_HEIGHT } from './ItemsLayout'
import React from 'react';
import { ItemsLayout } from './ItemsLayout'


// reder rows
export function renderRows(this: ItemsLayout): React.ReactElement[] {
  const { props } = this;
  const items = [];
  const height = props.height;
  let rowViewStart = props.firstVisibleRowI;
  if (ST.isUndefined(rowViewStart) || rowViewStart < 0) {
    rowViewStart = 0;
  }

  const visibleRowsCount = Math.ceil(height / CELL_HEIGHT);

  let rowViewEnd = rowViewStart + visibleRowsCount;

  if (props.items.length < rowViewEnd) {
    rowViewEnd = props.items.length;
  }

  let defaultColor = 'st-grid-body-cell-project-one';
  for (let i = rowViewStart; i < rowViewEnd; i++) {
    defaultColor = 'st-grid-body-cell-project-one';
    if (i % 2 == 1) {
      defaultColor = 'st-grid-body-cell-project-two';
    }

    const newItem: React.ReactElement = <RowLayout
      defaultColor={defaultColor}
      onChangeItem={props.onChangeItem}
      onMouseDownItem={props.onMouseDownItem}
      onMouseEnterItem={props.onMouseEnterItem}
      onMouseLeaveItem={props.onMouseLeaveItem}
      onDoubleClickItem={props.onDoubleClickItem}
      onClickItem={props.onClickItem}
      rowNum={i}
      columns={ST.clone(props.columns)}
      item={props.items[i]} key={i} />

    items.push(newItem);
  }

  return items;
}