import * as ST from '../../common'
import { typeItem } from './../../Grid';


export function sortItems(items: typeItem[], cellAlias: string, order?: string):typeItem[] {
  sortItemsRecursive(items, cellAlias, order);
  return items;
}


function sortItemsRecursive(items: typeItem[], cellAlias: string, order?: string): void {


  if (ST.isArray(items) == false) {
    return;
  }

  if (order == 'smallestfirst') {

    items.sort((a: typeItem, b: typeItem) => {
      return smallestFirst(a, b, cellAlias)
    });

  } else {

    items.sort((a: typeItem, b: typeItem) => {
      return biggestFirst(a, b, cellAlias)
    });

  }



  /*for(let i = 0; i < items.length; i++)
  {

    if(ST.isArray(items[i]['children']))
    {
      sortItemsRecursive(items[i]['children'], cellAlias, order)
    }
    
  }*/

}


function biggestFirst(a: typeItem, b: typeItem, cellAlias: string): number {
    
    let tempA = a['data'][cellAlias] as typeItem;
    let tempB = b['data'][cellAlias] as typeItem;

    if (tempB > tempA ) {
      return 1
    }

    if (tempA > tempB) {
      return -1;
    }

  

  return 0;
}

function smallestFirst(a: typeItem, b: typeItem, cellAlias: string): number {
  let tempA = a['data'][cellAlias] as typeItem;
  let tempB = b['data'][cellAlias] as typeItem;

  if (tempB < tempA) {
    return 1
  }

  if (tempA < tempB) {
    return -1;
  }
  return 0;
}

//by number in a sorted array, returns the number in an unsorted array
export function calcOriginal(selNum: number|undefined, items: typeItem[] | undefined, 
                              sortingCellAlias: string, orderSorting?: string) {
  let itemsCopy = ST.clone(items);
  itemsCopy.forEach((item: typeItem, i: number) => {
    item.propsI = i;
  });
  itemsCopy = sortItems(itemsCopy, sortingCellAlias, orderSorting);
  for (let i = 0; i < itemsCopy.length; i++) {
    if (itemsCopy[i].propsI == selNum) {
      return i;
    }
  }
  return undefined;
}