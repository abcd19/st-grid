

import {Table, ComboboxCell, CheckboxCell, StringFld, Combobox, Checkbox} from './stgrid'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'



let list = [];
for(var i = 0; i < 20; i++)
{
  list.push({
  raw: String('raw'+i), display: String('display'+i)
  });
}



class App extends React.Component
{
  constructor(props)
  {
    super(props);

    let items = [];

    for(var i = 0; i < 100; i++)
    {
      var newItem = {
  
        data: {
          'Num': String(i),
          'checkboxCell': true,
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
        title: 'checkboxCell',
        alias: 'checkboxCell',
        widthPix: 200,
        type: {
          constr: CheckboxCell,
          settings:{}
        },
      },
  
      {
        title: 'col5',
        alias: 'col5',
        widthPix: 200,
        type: {
          constr: ComboboxCell,
          settings:{
            items: list,
            clearBtnFlag: true
          }
        },
      },

    ];

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onMouseDownItem = this.onMouseDownItem.bind(this);

    this.state ={
      items: items,
      columns: columns,
      selItemNum: 1
    }
  }

  onChangeItem(rowNum, cellAlias, newVal)
  {
    let {items} = this.state;
    items[rowNum]['data'][cellAlias] = newVal;
    this.setState({items: items});
  }

  onAddItem(newItem)
  {
    let {items} = this.state;
    items.push(newItem);
    this.setState({
      items: items,
      selItemNum: items.length-1
    });
  }

  onRemoveItem(rowNum)
  {
    let {items} = this.state;
    items.splice(rowNum, 1);
    this.setState({
      items: items,
  
    });
  }

  onMouseDownItem(rowNum, cellAlias)
  {
    console.log('mouseDownItem'); console.dir(arguments);  
    this.setState({selItemNum: rowNum});
  }

  render(){
    return(
      <Table
      width = {900} 
      height = {700}
      selItemNum = {this.state.selItemNum}
      onChangeItem = {this.onChangeItem}
      onAddItem = {this.onAddItem}
      onRemoveItem = {this.onRemoveItem}
      onMouseDownItem = {this.onMouseDownItem}
      items = {this.state.items}
      columns = {this.state.columns}
    />);

  }
}

export const MyStringFld = () =>
{
  const [val, setVal] = useState('');
  return (<StringFld readOnly={true} onChange={(newVal)=> setVal(newVal)} clearBtnFlag = {true} val = {val} />)
}


export const MyCombobox = () =>
{
  const [val, setVal] = useState({raw: 'raw5'});
  return (
      <div style={{width: 420, height:100,}}> 
        <Combobox onChange={(newVal)=> setVal(newVal)} items={list} disableSearch={true} clearBtnFlag = {true} val = {val} />
      </div>)
}

export const MyCheckbox = () =>
{
  const [val, setVal] = useState('');
  return (<Checkbox onChange={(newVal)=> setVal(newVal)} val = {val} />)
}



export function run()
{    
    ReactDOM.render(
      <div style={{height: 400, overflow:'scroll'}}>
        <App  />
      </div>
    , document.getElementById('myTbl1'));

} 





