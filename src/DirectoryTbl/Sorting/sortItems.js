import * as ST from '../../common'

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

//по номеру в отсортированном массиве, возвращает номер в неотсортированном
export function calcOriginal(selNum, items, sortingCellAlias, orderSorting)
{
  let itemsCopy = ST.clone(items);
  itemsCopy.forEach((item, i)=>{
    item.propsI = i;
  });
  itemsCopy = sortItems(itemsCopy, sortingCellAlias, orderSorting);
  for(let i =0; i < itemsCopy.length; i++)
  {
    if(itemsCopy[i].propsI == selNum)
    {
      return i;
    }
  }
  return undefined;
}