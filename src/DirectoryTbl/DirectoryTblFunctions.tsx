
import * as ST from '../common';

//копирует массив айтемов
//при этом удаляются всякие системыне переменные типа layoutmode, color и проч
export const cloneData = (data: any) =>
{ 
  const res: any = [];
  data.forEach((item: any)=>{
    const n = {
      data:  ST.clone(item['data'])
    };
    res.push(n);
  });

  return res;
}