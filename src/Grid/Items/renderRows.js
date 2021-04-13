import * as ST from '../../common';
import {RowLayout} from './Table/RowLayout'
import {CELL_HEIGHT} from './ItemsLayout'
import React from 'react';

  //отрендерить строки таблицы
 export function renderRows()
 {  
    let items = [];
    //расчитываем количество отображаемых строк
    //берем Высоту
    let height = this.props.height;
    
    //В зависимости от того проскроллена таблица определяем первую первую строку
    let rowViewStart = this.props.firstVisibleRowI;
    if(ST.isUndefined(rowViewStart) || rowViewStart < 0)
    {
      rowViewStart = 0;
    }

    //расчитываем сколько строк еще влезает в эту высоту
    //округляем в большую стророну
    let visibleRowsCount = Math.ceil(height / CELL_HEIGHT);
    
    //Нижняя граница отображения строк (последняя отображаемая строка)
    let rowViewEnd = rowViewStart + visibleRowsCount;

    //нижняя граница не привосходит общее количество строк
    if(this.props.items.length <  rowViewEnd)
    {
      rowViewEnd = this.props.items.length;
    }

    for(let i = rowViewStart; i < rowViewEnd; i++)
    {
      
      let defaultColor = 'st-grid-body-cell-project-one';
      if(i%2 == 1)
      {
        defaultColor = 'st-grid-body-cell-project-two';
      }

      let newItem = <RowLayout 
          defaultColor= {defaultColor} 
          onChangeItem = {this.props.onChangeItem}
          onMouseDownItem = {this.props.onMouseDownItem}
          onMouseEnterItem = {this.props.onMouseEnterItem}
          onMouseLeaveItem = {this.props.onMouseLeaveItem}
          onDoubleClickItem = {this.props.onDoubleClickItem}
          onClickItem = {this.onClickItem}
          rowNum = {i} 
          columns = { ST.clone(this.props.columns) } 
          item= {this.props.items[i]}   key={i} />

      items.push(newItem);
    }

    return items;
  }