import * as ST from '../../common';
import {renderRows} from './renderRows';
import React from 'react';


export interface IItemsLayoutProps{
  columns: any[];
  firstVisibleRowI: any;
  height: any;
  items: any[];
  onChangeItem: any;
  onMouseDownItem: any;
  onMouseEnterItem: any;
  onMouseLeaveItem: any;
  onDoubleClickItem: any;
  onClickItem: any;
}


// set of rows
class ItemsLayout extends React.Component<IItemsLayoutProps> {

  private renderRows: any;
  public onClickItem: any;

  constructor(props: IItemsLayoutProps)
  {
    super(props);
    this.renderRows = renderRows.bind(this);
  };

  render()
  {
    let items = this.renderRows(this.props);

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

