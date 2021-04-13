export function onAddItem(newItem)
{
  let {items} = this.state;
  items.push(newItem);
  this.setState({
    items: items,
    selItemNum: items.length-1
  });
}

export function onMouseDownItem(rowNum, cellAlias)
{
  console.log('mouseDownItem'); 
  //console.dir(arguments);  
  this.setState({selItemNum: rowNum});
}

  
export function onChangeItem(rowNum, cellAlias, newVal)
{
  let {items} = this.state;

  if(cellAlias == 'type')
  {
    switch(newVal['raw'])
    {
      case 'date':
        items[rowNum]['data']['value'] = {'type': 'date', val: undefined};
        break;
        case 'check':
          items[rowNum]['data']['value'] = {'type': 'check', val: undefined};
          break;
      default:
        items[rowNum]['data']['value'] = {'type': 'string', val: undefined};
        break;
    }
  }

  
  items[rowNum]['data'][cellAlias] = newVal;
  this.setState({items: items});
}
