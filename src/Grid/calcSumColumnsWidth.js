
//подсчет суммартной ширины столбцов
export const calcSumColumnsWidth = (columns) =>
{
  let sum = 0;
  for(let i = 0; i < columns.length; i++)
  {
    sum = sum + columns[i]['widthPix'];
  }
  return sum;  
}