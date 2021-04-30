import * as ST from '../../../common'
import {CellLayout} from '../Cell/CellLayout';
import React from 'react';


export interface IRowLayoutProps {
  onChangeItem: (rowObject: any, cellAlias: string, val: any)=>void,
  onMouseEnterItem: (rowObject: any, cellAlias: string) => void,
  onMouseLeaveItem: (rowObject: any, cellAlias: string)=>void,
  onMouseDownItem: (rowObject:any, cellAlias:string) =>void,
  onDoubleClickItem: (rowObject:any, cellAlias:string) =>void,
  onClickItem: (rowObject:any, cellAlias:string) =>void,
  item: any,
  defaultColor: string,
  columns: any[],
  rowNum: number,
}

/* row of the table */
export class RowLayout extends React.Component<IRowLayoutProps> {
  
  private cells: any;

  constructor(props: IRowLayoutProps)
  {
    super(props);  
    this.cells = {};

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);
    this.onDoubleClickItem = this.onDoubleClickItem.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  };
  
  onChangeItem(cellAlias: string, val: any)
  {
    if(ST.isFunction(this.props['onChangeItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onChangeItem'].apply(self,[rowObject, cellAlias, val])
    }
  }

  onMouseEnterItem(cellAlias: string)
  {
    if(ST.isFunction(this.props['onMouseEnterItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseEnterItem'].apply(self,[rowObject, cellAlias])
    }
  }

  onMouseLeaveItem(cellAlias: string)
  {
    if(ST.isFunction(this.props['onMouseLeaveItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseLeaveItem'].apply(self,[rowObject, cellAlias])
    }
  }

  onMouseDownItem(cellAlias: string)
  {
    if(ST.isFunction(this.props['onMouseDownItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseDownItem'].apply(this,[rowObject, cellAlias])
    }
  }

  onDoubleClickItem(cellAlias: string)
  {
    if(ST.isFunction(this.props['onDoubleClickItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onDoubleClickItem'].apply(this,[rowObject, cellAlias])
    }
  }

  onClickItem(cellAlias: string)
  {
    if(ST.isFunction(this.props['onClickItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onClickItem'].apply(this,[rowObject, cellAlias])
    }
  }


  render()
  {
    let cells = [];  
    for(var i = 0; i < this.props.columns.length; i++)
    {            
      let {visible, type, alias, widthPix} = this.props['columns'][i];
      
      if(visible === false)
      {
        continue
      }

      let layoutMode = this.props.item ? this.props.item.layoutMode: 'view';
      let color = this.props.item ? this.props.item.color: undefined;
      let itemData = this.props.item ?  this.props.item['data']: undefined;
      let val = itemData ?  this.props.item['data'][ alias ]: undefined;
      //Создаем ячейки
      let newCell = <CellLayout 
        color = {color}
        onChangeItem = {this.onChangeItem}
        onMouseDownItem = {this.onMouseDownItem}
        onMouseEnterItem = {this.onMouseEnterItem}
        onMouseLeaveItem = {this.onMouseLeaveItem}
        onDoubleClickItem = {this.onDoubleClickItem}
        onClickItem = {this.onClickItem}
        layoutMode = {layoutMode}
        type = {type}
        alias = {alias}
        rowItem = {this.props.item}
        rowNum = {this.props.rowNum} 
        val = {val}
        defaultColor={this.props.defaultColor} 
        widthPix = {widthPix} 
        key={alias}  />;

        cells.push(newCell);
    }

    return(
          <tr>
            { cells }
            <td  className='st-grid-head-cell-freeSpace'></td>
          </tr>);
  }
  
}


