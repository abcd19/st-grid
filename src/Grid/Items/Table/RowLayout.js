import * as ST from '../../../common'
import {CellLayout} from '../Cell/CellLayout';
import ReactDOM from 'react-dom';
import React from 'react';

/**
 * Строка
 */
class RowLayout extends React.Component {
    
  constructor(props)
  {
    super(props);
    this.props = props;    
    this.cells = {};

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
  };
  
  onChangeItem(cellAlias, val)
  {
    if(ST.isFunction(this.props['onChangeItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onChangeItem'].apply(self,[rowObject, cellAlias, val])
    }
  }

  onMouseDownItem(cellAlias)
  {
    if(ST.isFunction(this.props['onMouseDownItem']))
    {
      let rowObject = this.props.item;
      rowObject.rowNum = this.props.rowNum;
      this.props['onMouseDownItem'].apply(this,[rowObject, cellAlias])
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
      
      //Создаем ячейки
      let newCell = <CellLayout 
        color = {this.props.item.color}
        onChangeItem = {this.onChangeItem}
        onMouseDownItem = {this.onMouseDownItem}
        layoutMode = {this.props.item.layoutMode}
        type = {type}
        alias = {alias}
        rowNum = {this.props.rowNum} 
        val = {this.props.item['data'][ alias ]}
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

export {RowLayout}

