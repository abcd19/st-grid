import * as ST from '../../common';
import {RowLayout} from './Table/RowLayout'
import ReactDOM from 'react-dom';
import React from 'react';

/**
 * Общий набора строк таблицы (или вершин  дерева)
 */
class ItemsLayout extends React.Component {

  constructor(props)
  {
    super(props);
    this.state ={};
    this.props = props;
  };


  render()
  {
    let items = [];
    //расчитываем количество отображаемых строк
    //берем ширину
    let height = this.props.height;
    
    //В зависимости от того проскроллена таблица определяем первую первую строку
    let rowViewStart = this.props.firstVisibleRowI;
    if(ST.isUndefined(rowViewStart))
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
          rowNum = {i} 
          columns = { ST.clone(this.props['columns']) } 
          item= {this.props.items[i]}   key={i} />

      items.push(newItem);
    }

    //добавляем пустую последнюю строку для красоты, чтобы последний айтем не уходил за границу таблицы
    //за счет этой строки таблицу можно проскролить чуть ниже
    let springRow = <tr className="free-spaceTr" key="free-spaceTr">
                      <td colSpan={this.props['columns'].length} style={{height: CELL_HEIGHT}}></td>
                    </tr>;
    items.push(springRow);
    

    return(
      <table cellPadding ="0" cellSpacing="0"   style={{borderCollapse: 'collapse' }}>
        <tbody>
          {items}
        </tbody>
      </table>
    )
  };
};
let CELL_HEIGHT = 30;
let SCROLL_PLACE = 20;
let MIN_COL_WIDTH = 100;
export {ItemsLayout, CELL_HEIGHT, SCROLL_PLACE, MIN_COL_WIDTH}

