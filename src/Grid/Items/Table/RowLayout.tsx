import * as ST from '../../../common'
import {CellLayout} from '../Cell/CellLayout';
import React from 'react';
import {tyepCellVal} from './../Cell/CellLayout'
import {typeColumn, typeItem} from './../../../Grid/GridLayout'



export interface IRowLayoutProps {
  onChangeItem: (rowObject: typeItem, cellAlias: string, val: tyepCellVal)=>void,
  onMouseEnterItem: (rowObject: typeItem, cellAlias: string) => void,
  onMouseLeaveItem: (rowObject: typeItem, cellAlias: string)=>void,
  onMouseDownItem: (rowObject:typeItem, cellAlias:string) =>void,
  onDoubleClickItem: (rowObject: typeItem, cellAlias:string) =>void,
  onClickItem: (rowObject:typeItem, cellAlias:string) =>void,
  item: typeItem,
  defaultColor: string,
  columns: typeColumn[],
  rowNum: number,
}

/* row of the table */
export class RowLayout extends React.Component<IRowLayoutProps> {
  
  private cells: React.ReactElement[];

  constructor(props: IRowLayoutProps)
  {
    super(props);  
    this.cells = [];
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);
    this.onDoubleClickItem = this.onDoubleClickItem.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }
  
  onChangeItem(cellAlias: string, val: tyepCellVal):void
  {
    if(ST.isFunction(this.props['onChangeItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onChangeItem'].apply(self,[rowObject, cellAlias, val])
    }
  }

  onMouseEnterItem(cellAlias: string):void
  {
    if(ST.isFunction(this.props['onMouseEnterItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseEnterItem'].apply(self,[rowObject, cellAlias])
    }
  }

  onMouseLeaveItem(cellAlias: string):void
  {
    if(ST.isFunction(this.props['onMouseLeaveItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseLeaveItem'].apply(self,[rowObject, cellAlias])
    }
  }

  onMouseDownItem(cellAlias: string):void
  {
    if(ST.isFunction(this.props['onMouseDownItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseDownItem'].apply(this,[rowObject, cellAlias])
    }
  }

  onDoubleClickItem(cellAlias: string):void
  {
    if(ST.isFunction(this.props['onDoubleClickItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onDoubleClickItem'].apply(this,[rowObject, cellAlias])
    }
  }

  onClickItem(cellAlias: string): void
  {
    if(ST.isFunction(this.props['onClickItem']))
    {
      const rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onClickItem'].apply(this,[rowObject, cellAlias])
    }
  }


  render(): React.ReactElement
  {
    const cells = [];  
    for(let i = 0; i < this.props.columns.length; i++)
    {            
      const {visible, type, alias, widthPix} = this.props['columns'][i];
      
      if(visible === false)
      {
        continue
      }

      const layoutMode = this.props.item ? this.props.item.layoutMode: 'view';
      const color = this.props.item ? this.props.item.color: undefined;
      const itemData = this.props.item ?  this.props.item['data']: undefined;
      const val = itemData ?  this.props.item['data'][ alias ]: undefined;
      //Создаем ячейки
      const newCell = <CellLayout 
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


