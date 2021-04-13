//возвращает айтем по его индексу в дереве
import * as ST from './../common';

export function getItemByIndex(items, index)
{
  return getItemByIndexRecursive(items, ST.clone(index));
}



function getItemByIndexRecursive(items, index)
{

  let cur = index.shift();
  
  if(ST.isUndefined(items[cur]) == false)
  {
    if(index.length == 0)
    {
      return items[cur]
    }

    return getItemByIndexRecursive(items[cur]['children'], index);
  }

  return undefined;
}