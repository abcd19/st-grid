


export const calcSumColumnsWidth = (columns: any[]) =>
{
  let sum = 0;
  for(let i = 0; i < columns.length; i++)
  {
    sum = sum + columns[i]['widthPix'] ;
  }
  return sum;  
}