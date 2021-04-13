import * as ST from './../../common'
import {calcRank} from './../../findWords'

//Поиск
//ранжирование айтемов по слову
export function searchItems(items, word)
{
  //массив соединенных значений из ячеек
  let concatedVal = [];
  //связь  concatedVal с вершиной
  let nodeConcatedValRel = [];

  buildItemLinearRecursive(concatedVal, nodeConcatedValRel, items);
  //считаем ранги
  let ranked = calcRank(concatedVal, word,  {'deleteElementByRankZero': true});
  //на основе рагов перестраиваем вершины дерева
  let filtredNodes = [];
  for(let i = 0; i < ranked.length; i++)
  {
    filtredNodes.push(ST.clone(nodeConcatedValRel[ ranked[i]['elemLink'] ]));
  }
  
  return filtredNodes;
}


function buildItemLinearRecursive(concatedVal, nodeConcatedValRel, items)
{
  
  for(let i = 0; i < items.length; i++)
  {
    concatedVal.push(concatValues(items[i]));
    nodeConcatedValRel.push(items[i]);
    if(ST.isArray(items[i]['children']))
    {
      buildItemLinearRecursive(concatedVal, nodeConcatedValRel, items[i]['children']);
    }
  }
  
}

function concatValues(item)
{
  let str = [];
  for(let al in item['data'])
  {
    if(ST.isString(item['data'][al]))
    {
      str.push(item['data'][al])
      continue;
    }

    if(ST.isObject(item['data'][al]) && ST.isString(item['data'][al]['display']))
    {
      str.push(item['data'][al]['display']);
    }
  }
  return str.join(' ');

}
