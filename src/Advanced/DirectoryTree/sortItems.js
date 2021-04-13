import * as ST from './../../common'
import {getItemByIndex} from './../../Tree/functions'

//сортирует элеметы
export function sortItems(items, cellAlias, order)
{
  sortItemsRecursive(items, cellAlias, order);
  return items;
}

//потомки
function sortItemsRecursive(items, cellAlias, order)
{

 
  if(ST.isArray(items) == false)
  {
    return;
  }
  
  if(order == 'smallestfirst')
  {

    items.sort((a, b)=>{
      return smallestFirst(a,b, cellAlias)
    });

  }else{
        
    items.sort((a, b)=>{
      return biggestFirst(a,b, cellAlias)
    });

  }



  for(let i = 0; i < items.length; i++)
  {

    if(ST.isArray(items[i]['children']))
    {
      sortItemsRecursive(items[i]['children'], cellAlias, order)
    }
    
  }

}


function biggestFirst(a,b, cellAlias)
{
  if(b['data'][cellAlias] > a['data'][cellAlias])
  {
    return 1
  }

  if(a['data'][cellAlias] == b['data'][cellAlias])
  {
    return 0;
  }

  if(a['data'][cellAlias] > b['data'][cellAlias])
  {
    return -1;
  }
}

function smallestFirst(a,b, cellAlias)
{
  if(b['data'][cellAlias] < a['data'][cellAlias])
  {
    return 1
  }

  if(a['data'][cellAlias] == b['data'][cellAlias])
  {
    return 0;
  }

  if(a['data'][cellAlias] < b['data'][cellAlias])
  {
    return -1;
  }
}


//по индексу в сортировке восстанавливает индекс в оригинальном массиве
export function calcOriginal(selNumInd, items, sortingCellAlias, orderSorting)
{
  let itemsCopy = ST.clone(items);
  makeOriginalLink(itemsCopy);
  itemsCopy = sortItems(itemsCopy, sortingCellAlias, orderSorting);
  let find = getItemByIndex(itemsCopy, selNumInd);
  return find.orginalIndex;
}

function makeOriginalLink(items, index)
{
  
  if(items == undefined)
  {
    return;
  }
  

  
  items.forEach((item, i)=>{

    let cur;
    if(index == undefined)
    {
      cur = [i]
    }else{
      cur = ST.clone(index);
      cur.push(i);
    }    

    item.orginalIndex = cur;

    makeOriginalLink(item['children'], cur);
  });
}