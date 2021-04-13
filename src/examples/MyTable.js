

import {DirectoryTbl, ImgButtonLayout, ComboboxFldCell, CheckboxFldCell, DateFldCell} from '../stgrid'
import React, { useState } from 'react'
import {list} from './stgridIndexCommon';
import ReactDOM from 'react-dom'


function generateItem()
{
  var newItem = {
  
    data: {
      'Num': '321',
      'alias': 'ИзделияВВТ',
    },
  }
  return newItem
}

export class MyTable extends React.Component
{
  constructor(props)
  {
    super(props);

    let items = [];

    for(var i = 0; i < 10; i++)
    {
      var newItem = {
  
        data: {
          'Num': String(i),
          'CheckboxFldCell': true,
          'textCell': '123  dfsfsd sdfdfs dsd sdfdsf sdfsdf dsfdfdsf'
        }
  
      }; 
      items.push(newItem);
    }
    
    let columns = [
      {
        title: '№',
        alias: 'Num',        
      },                   
      {
        title: 'CheckboxFldCell123456789',
        alias: 'CheckboxFldCell',
        widthPix: 200,
        type: {
          constr: CheckboxFldCell,
          settings:{}
        },
      },
  
      {
        title: 'col5',
        alias: 'col5',
        widthPix: 200,
        type: {
          constr: ComboboxFldCell,
          settings:{
            items: list,
            listWidthPix: 200,
            clearBtnFlag: true
          }
        },
      },
      
      {
        title: 'col6',
        alias: 'col6',
        widthPix: 200,
        type: {
          constr: DateFldCell,
          settings:{
            items: list,
            clearBtnFlag: true
          }
        },
      },

    ];

    this.onChange = this.onChange.bind(this);
    
    this.state = {
        items: items,
        columns: columns,
        toolbar: toolbar
    }

  }

  onChange(newItems, action)
  {
    console.dir(arguments);
    this.setState({items: newItems});
  }

  onSelectItem(itemNum)
  {
    console.dir(arguments);
    console.log('onSelectItem');
  }

  render(){    
    return(
      <>
      <button onClick = {()=>this.setState({items: [generateItem('id')]})}>Делай</button>
      <DirectoryTbl
        width = {900} 
        height = {400}
        addBtnFlag = {true}
        onChange = {this.onChange}
        items = {this.state.items}        
        onSelectItem = {this.onSelectItem}
        removeBtnFlag = {true}
        removeAllBtnFlag = {true}
        onRemoveAllItems = {function(){alert(123)}}
        sortingFlag = {true}
        columns = {this.state.columns}
    /></ >);

  }
}





