import {DirectoryTree, ComboboxFldCell, StringFldAnchoredCell, CheckboxFldCell, StringFldCell, Combobox, Checkbox, DateFld, DateFldCell} from '../stgrid'
import {list} from './stgridIndexCommon';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function generateItem()
{
  var newItem = {
  
    data: {
      'object': 'Изделия ВВТ',
      'alias': 'ИзделияВВТ',
    },
    'isOpened': true,
    'isGroup': true,
    'children': [
      generateLeaf('id'),
      generateLeaf('Наименование'),
      generateLeaf('Индекс'),
      {
        data: {
          'object': 'Изготовитель',
        },
        'isOpened': true,
        'isGroup': true,
        'children': [generateLeaf('id'), generateLeaf('Наименование')]
      },
      generateLeaf('Децемальный номер'),
      generateLeaf('Комментарий'),
      {
        data: {
          'object': 'Группа изделий ВВТ',
        },
        'isOpened': true,
        'isGroup': true,
      },
      {
        data: {
          'object': 'Уровень',
        },
        'isOpened': true,
        'isGroup': true,
      }
    ]

  }; 
  return newItem;    
}


function generateLeaf(object)
{
  var newItem = {
  
    data: {
      'object': object,
    },
    'isGroup': false,
  }; 
  return newItem; 
}


export class MyTree extends React.Component
{
  constructor(props)
  {
    super(props);

    let items = [];

    var newItem = generateItem(); 
    items.push(newItem);

  
    let columns = [
      {
        title: 'Объект',
        alias: 'object',  
        widthPix: 300,
        
        type:{
          constr: StringFldAnchoredCell,
          settings: {
            readOnly: true,
            canUserSelectFlag: false
          }
        }      
      },                   
      {
        title: 'Псевдоним',
        alias: 'alias',
        widthPix: 200,
        type: {
          constr: StringFldCell,
          settings:{
            readOnly: true,
          }
        },
      },
    ];

   // this.onChangeItem = this.onChangeItem.bind(this);
   // this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    //this.onMouseDownItem = this.onMouseDownItem.bind(this);
    //this.onChange = this.onChange.bind(this);
   // this.onSelectItem = this.onSelectItem.bind(this);
    this.onDoubleClickItemReplace = this.onDoubleClickItemReplace.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.state ={
      items: items,
      columns: columns,
    }
  }
  
  onSelectItem()
  {
    console.log(arguments)
    console.log('onSelectItem');
  }


  onChange(newItems, action)
  {
    console.log(arguments)
    this.setState({items: newItems});
  }


  /*onChange(items)
  {
    this.setState({items: items});
  }

  /*onChangeItem(item, cellAlias, newVal)
  {
    //this.setState({items: items});

    /*let {items} = this.state;
    item['data'][cellAlias] = newVal;
    this.setState({items: items});
  }*/

  /*onOpenGroup(item)
  {
    console.log('onOpenGroup');
    let {items} = this.state;
    item.link.isOpened = true;
    this.setState({items: items});
  }*/

  /*onCloseGroup(item)
  {
    console.log('onCloseGroup');
    let {items} = this.state;
    item.link.isOpened = false;
    this.setState({items: items});
  }*/

  /*onAddItem(newItem)
  {
    let {items} = this.state;
    items.push(newItem);
    this.setState({
      items: items,
      selItemNum: items.length-1
    });
  }*/

 /* onSelectItem(item, cellAlias)
  {
    //console.dir(item)
  }*/

  onRemoveItem(rowNum)
  {
    console.log('onRemoveItemReplace');
    
  }
  
  /*onClickHeaderCell(alias)
  {
    console.log(alias);
  }

  onMouseDownItem(item, cellAlias)
  {
    //let {index} = item;
   // this.setState({selIndex: index});
  }
*/
  onDoubleClickItemReplace(item, cellAlias)
  {
    console.log('onDoubleClickItem')
    //console.dir(arguments)
  }
  
  render(){

    return(
      <>
      <button onClick = {()=>this.setState({items: [generateLeaf('id')]})}>Делай</button>
      <DirectoryTree
      width = {900} 
      height = {700}
      searchFldFlag = {true}
      addBtnFlag = {false}
      removeBtnFlag = {true}
      //onChange = {this.onChange}
      sortingFlag = {true}
      //selIndex = {this.state.selIndex}
     // onChangeItem = {this.onChangeItem}
     // onSelectItem = {this.onSelectItem}
     // onAddItem = {this.onAddItem}
      
     // onMouseDownItem = {this.onMouseDownItem}
     // onClickHeaderCell ={this.onClickHeaderCell}
     // onChangeSearchFld= {this.onChangeSearchFld}
    //  onDoubleClickItemReplace = {this.onDoubleClickItemReplace}
     // initItems = {this.state.items}
      onChange = {this.onChange}
      items = {this.state.items}
      onSelectItem = {this.onSelectItem}
      onRemoveBtnClickReplace = {this.onRemoveItem}
      onDoubleClickItemReplace = {this.onDoubleClickItemReplace}

      columns = {this.state.columns}
    /></ >);

  }
}





