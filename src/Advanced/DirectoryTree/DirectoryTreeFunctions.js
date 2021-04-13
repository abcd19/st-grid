
import * as ST from '../../common';

//копирует массив айтемов
//при этом удаляются всякие системыне переменные типа layoutmode, color и проч
export const cloneItems = (items) =>
{ 
  let res = [];

  if(ST.isArray(items) == false)
  {
    return res;
  }

  items.forEach((item,i, ar)=>{
    let n ={
      data:  ST.clone(item['data']),
      isGroup: item['isGroup'],
      isOpened: item['isOpened'],
    };

    if(ST.isArray(item['children']))
    {
      n['children'] = cloneItems(item['children']);
    }

    res.push(n);
  });
  
  return res;
}