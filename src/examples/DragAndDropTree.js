import {Tree, ComboboxFldCell, StringFldAnchoredCell, CheckboxFldCell, StringFld, Combobox, Checkbox, DateFld, DateFldCell} from './../stgrid'
import {list} from './stgridIndexCommon';
import * as ST from './../common';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function generateItems()
{
  return [
    {
      data: {
        'obj': 'Поля',
      },
      'isGroup': true, 
      'isOpened': true,
      'children': [
        {data: {'obj': 'Дата предоставления 1 1 1 1 Дата начала отчетного периода Дата начала отчетного периода'}},
        {data: {'obj': 'Дата начала отчетного периода'}},
        {data: {'obj': 'Значение'}},
        {data: {'obj': 'Источник поступления'}},
        {
          data: {'obj': 'Организация'}, 'isGroup': true,  'isOpened': true,
          children: [
            {data: {'obj': 'id'}},
            {data: {'obj': 'Виды выпускаемой продукции'}},
            {data: {'obj': 'Головная организация'}},
          ]
        },
      ],
    },
    {
      data: {
        'obj': 'Атрибуты',
      }, 
      'isGroup': true,
      'isOpened': true,
      'children': [{data: {'obj': 'Отчетный год'}}]
    }
  ] 
}


export class DragAndDropTree extends React.Component
{
  constructor(props)
  {
    super(props);

    let items = generateItems();
    let tableWidthPix = 350;
    this.onOpenGroup = this.onOpenGroup.bind(this);
    this.onCloseGroup = this.onCloseGroup.bind(this);
    this.mouseEnterMarkRow = undefined;
    let columns = [
      {
        title: 'Объект',
        alias: 'obj', 
        widthPix: tableWidthPix - 20, 
        type:{
          constr: StringFldAnchoredCell,
          settings: {
            canUserSelectFlag: false,
            clearBtnFlag: false,
            onOpenGroup : this.onOpenGroup,
            onCloseGroup : this.onCloseGroup
          }
        }      
      },  
      {
        title: 'hiddenObject',
        alias: 'hiddenObject',
        visible: false
      }                 
    ];

   // this.onChangeItem = this.onChangeItem.bind(this);
   // this.onAddItem = this.onAddItem.bind(this);
   // this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
    
    this.state ={
      items: items,
      columns: columns,
     // selIndex: [1],
      tableWidthPix: tableWidthPix
    }
  }

  onChangeItem(rowNum, cellAlias, newVal)
  {
    let {items} = this.state;
    items[rowNum]['data'][cellAlias] = newVal;
    this.setState({items: items});
  }

  onOpenGroup(item)
  {
    console.log('onOpenGroup');
    let {items} = this.state;
    item.link.isOpened = true;
    this.setState({items: items});
  }

  onCloseGroup(item)
  {
    console.log('onCloseGroup');
    let {items} = this.state;
    item.link.isOpened = false;
    this.setState({items: items});
  }

  /*onAddItem(newItem)
  {
    let {items} = this.state;
    items.push(newItem);
    this.setState({
      items: items,
      //selItemNum: items.length-1
    });
  }*/

  /*onRemoveItem(rowNum)
  {
    let {items} = this.state;
    items.splice(rowNum, 1);
    this.setState({
      items: items,
  
    });
  }*/

  onMouseEnterItem(item, cellAlias)
  {
    if(ST.isUndefined(this.mouseEnterMarkRow) == false)
    {
      this.mouseEnterMarkRow.color = undefined;
    }

    let {items} = this.state;
    this.mouseEnterMarkRow = this.getItemByIndexRecursive(items, item.index);
    this.mouseEnterMarkRow.color = 'linear-gradient(to top, #DED085, #FCFAF1)';
    this.setState({
      items: items,
    });
  }

  getItemByIndexRecursive(items, index)
  {

    let cur = index.shift();
    
    if(typeof(items[cur]) != 'undefined')
    {
      if(index.length == 0)
      {
        return items[cur]
      }

      return this.getItemByIndexRecursive(items[cur]['children'], index);
    }

    return undefined;
  }

  onMouseLeaveItem(item, cellAlias)
  {
    let {items} = this.state;
    let it = this.getItemByIndexRecursive(items, item.index);
    it.color = undefined;
    this.setState({
      items: items,
    });
  }

  onMouseDownItem(item, cellAlias)
  {
    //console.log('mouseDownItem1'); 
    //console.dir(arguments);  
    //console.dir(item)
    //this.setState({selIndex: item.index});
  }

  render(){

    
    return(
      <Tree
      addBtnFlag = {false}
      onAddItem = {this.onAddItem}
      removeBtnFlag = {false}
      onRemoveItem = {this.onRemoveItem}
      width = {this.state.tableWidthPix} 
      height = {this.props.height} 
      //420 лишний скролл 
      //проверить на 320 
      //проверит скрол на 620 (проверить скрол дло упора вниз и до упора вверх)
      //440 лишний скролл
      width = {350}
      //selItemNum = {this.state.selItemNum}
     // selIndex = {this.state.selIndex}
      onChangeItem = {this.onChangeItem}
      onMouseDownItem = {this.onMouseDownItem}
      onMouseEnterItem = {this.onMouseEnterItem}
      onMouseLeaveItem = {this.onMouseLeaveItem}
      items = {this.state.items}
      columns = {this.state.columns}
    />);

  }
}





