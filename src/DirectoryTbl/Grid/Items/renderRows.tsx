import * as ST from './../../../common';
import { RowLayout } from './RowLayout'
import { CELL_HEIGHT } from './../constants'
import React from 'react';
import { ItemsLayout } from './ItemsLayout'
import css from './../Items/renderRows.scss'

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

  let defaultColor = css.bodyCellTOne;
  for (let i = rowViewStart; i < rowViewEnd; i++) {
    defaultColor = css.bodyCellOne;
    if (i % 2 == 1) {
      defaultColor = css.bodyCellTwo;
    }

    const newItem: React.ReactElement = <RowLayout
      defaultColor={defaultColor}
      onChangeItem={props.onChangeItem}
      onMouseDownItem={props.onMouseDownItem}
      rowNum={i}
      columns={ST.clone(props.columns)}
      item={props.items[i]} key={i} />

    items.push(newItem);
  }

  return items;
}