JavaScript components for building storage and accounting forms. Works with React.

## Install

```bash
npm install @abcd19/st-grid
```

## Usage

demo: https://abcd19.github.io/

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table, ComboboxCell, CheckboxCell} from '@abcd19/st-grid';
import  '@abcd19/st-grid/dist/index.css'

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
          'col4': true,
          'longText': '123  dfsfsd sdfdfs dsd sdfdsf sdfsdf dsfdfdsf'
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
        title: 'col4',
        alias: 'col4',
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
            items: [
              {raw: 'val1', display: 'val1'}, 
              {raw: 'val2', display: 'val2'}
              ],
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


ReactDOM.render(
<App  />
, document.getElementById('root'));
```
