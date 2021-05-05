
import * as ST from '../common';
import {typeItem} from './../Grid/GridLayout';

// copies an array of items
// this removes any system variables such as layoutmode, color, etc.
export const cloneData = (data: typeItem[] = []): typeItem[] =>
{ 
  const res: typeItem[] = [];
  data.forEach((item: typeItem)=>{
    const n: typeItem = {
      data:  ST.clone(item['data'])
    };
    res.push(n);
  });

  return res;
}