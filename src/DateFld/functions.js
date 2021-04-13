
/**
 * return true if date is a weekend
 * @param {new Date()} date 
 * @returns {boolean}
 */
export function isWeekend(date)
{
    if(date.getDay()==0 || date.getDay()==6)
      return true;
    if(date.getDate()==8 && date.getMonth()==2)//8 марта
      return true;
    if(date.getDate()==23 && date.getMonth()==1)//23 февраля
      return true;
    if((date.getDate()==1 || date.getDate()==2 || date.getDate()==7) && date.getMonth()==0)//1,2,7 января
      return true;
    if((date.getDate()==9 || date.getDate()==1) && date.getMonth()==4)//1,9 мая
      return true;
    if(date.getDate()==4 && date.getMonth()==10)// 4 ноября - день народного единства
      return true;
    if(date.getDate()==12 && date.getMonth()==5)// 12 июня - день России
      return true;
    return false;
};

export function getDay(date)
{
  var day = date.getDay();
  if (day == 0) return 6;
  return day - 1;
};
   

export function compareDate(date1, date2)
{
    return (date1.getFullYear() == date2.getFullYear() && 
            date1.getMonth() == date2.getMonth() && 
            date1.getDate() == date2.getDate());
};

export function getOutputDate(date)
{
  var d=date.getDate();
  if(d<10)
    return "0"+String(d);
  return String(d);
};

export function getOutputMonth(date)
{
  var m=date.getMonth()+1;
  if(m<10)
    return "0"+String(m);
  return String(m);
};

export function isPreviousOrNextMonth(date,date_now)
{
  return (date_now.getMonth()!=date.getMonth() || date_now.getFullYear()!=date.getFullYear())
};



/*
* convert date from YYYY-MM-DD to DD.MM.YYYY 
*/
export function convertDate_FromISO8601_ToRus(date_str_in_ISO_format)
{
  var isISODate = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);
  if(!isISODate.test(date_str_in_ISO_format))
  {
    return;
  }
  var arr=date_str_in_ISO_format.split("-");
  return arr[2]+"."+arr[1]+"."+arr[0];
};

/*
* convert date from DD.MM.YYYY to YYYY-MM-DD
*/
export function convertDate_FromRus_ToISO8601(date_str_in_Rus_format)
{
  var isISODate = new RegExp(/^\d{2}\.\d{2}\.\d{4}$/);
  if(!isISODate.test(date_str_in_Rus_format))
  {
    return;
  }
  var arr = date_str_in_Rus_format.split(".");
  return arr[2]+"-"+arr[1]+"-"+arr[0];
};


/*
* convert date from DD.MM.YYYY to obejct (like new Date())
*/
export function convertDate_FromRus_toObject(date_str_in_Rus_format)
{
  var isISODate = new RegExp(/^\d{2}\.\d{2}\.\d{4}$/);
  if(!isISODate.test(date_str_in_Rus_format))
  {
    return;
  }
  
  var arr = date_str_in_Rus_format.split(".");

  return new Date(Number(arr[2]), Number(arr[1])-1, Number(arr[0]));
}

/**
 * get days count between date_begin and date_end
 * @param {type} date_begin
 * @param {type} date_end
 * @returns {Number}
 */
export function getNumberOfDaysBetween(date_begin, date_end)
{
  var date_arr_end=date_end.split("-");
  var date_arr_begin=date_begin.split("-");
  var c_date_begin=new Date(Number(date_arr_begin[0]),Number(date_arr_begin[1]),Number(date_arr_begin[2])).getTime();
  var c_date_end=new Date(Number(date_arr_end[0]),Number(date_arr_end[1]),Number(date_arr_end[2])).getTime();
  return ((c_date_end-c_date_begin)/1000/60/60/24)+1; //+1 потому что, считаем, что от сегодня до сегодня один день.
}



export const DAY_MILISEC = 86400000;

export const WEEK_MILISEC = 604800000;

export const DATE_NOW = new Date();

