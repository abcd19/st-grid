import React, {useState} from 'react';
import './Calendar.css';
import * as ST from './../../common';
import {DayGridLayout} from './DayGridLayout';
import {ComboboxFldLayoutEdit} from '../../ComboboxFld/ComboboxFldLayoutEdit';
import {getDay, DAY_MILISEC, WEEK_MILISEC} from '../functions';

export function CalendarLayout(props)
{
    //выбранная дата в инпуте (для подстветки на календаре)
  let selDate = props.selDate;
  
  let [buildDate, setBuildDate] = useState(selDate);
  let [buildYear, setBuildYear] = useState(buildDate.getFullYear());
  let [buildMonth, setBuildMonth] = useState(buildDate.getMonth());
  

  //строим календарь
  let dates = calcData(buildDate);


  var monthNow =  Number(new Date().getMonth());
  var yearNow = Number(new Date().getFullYear());
  var min = yearNow - 45,
  max = yearNow + 46;
  var years = [];
  for(var i = min; i < max; i++)
  {
    years.push({
      display: i, raw: i
    });
  }

  var months =[
    { raw: 0, display: "Январь" },
    { raw: 1, display: "Февраль" },
    { raw: 2, display: "Март" },
    { raw: 3, display: "Апрель" },
    { raw: 4, display: "Май" },
    { raw: 5, display: "Июнь" },
    { raw: 6, display: "Июль" },
    { raw: 7, display: "Август" },
    { raw: 8, display: "Сентябрь" },
    { raw: 9, display: "Октябрь" },
    { raw: 10, display: "Ноябрь" },
    { raw: 11, display: "Декабрь" }];

  const onDayClick = (date) =>
  {
    if(ST.isFunction(props.onDayClick))
    {
      props.onDayClick(date)
    }
  }

  const onChangeYear = (val) =>
  {
    setBuildDate(new Date(val.raw, buildMonth, 1));
    setBuildYear(val.raw);
  }

  const onChangeMonth = (val) =>
  {
    setBuildDate(new Date(buildYear, val.raw, 1));
    setBuildMonth(val.raw);
  }

  return(
    <table className='st-calendar-table'>
      <tbody>
        <tr>
          <td className='st-calendar-year'>
            <ComboboxFldLayoutEdit  onChange={onChangeYear} disableSearch={true}  val={{raw: buildYear}} items={years}/>
          </td>
          <td className='st-calendar-month'>
            <ComboboxFldLayoutEdit  onChange={onChangeMonth} disableSearch={true} val={{raw: buildMonth}} items={months}/>
          </td>
        </tr>
        <tr>
          <td colSpan = '2' className='st-calendar-td'>
            <DayGridLayout onDayClick={onDayClick} dates={dates} buildDate={buildDate} selDate={selDate}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}


function calcData(buildDate)
{  
   var firstCalendarDate = new Date(buildDate.getFullYear(), buildDate.getMonth(), 1, 12);
   //if is Monday
   if((firstCalendarDate) == 0)
   {
    //будем показывать календарь начиная с понедельника прошлого месяца (см 2010 февраля) если этого не сделать, 
    //то на календаре будут две недели с будущего месяца, 
    //а если сделать -  неделя с предыдущего и неделя с следующего(так красивее) 
    firstCalendarDate = new Date(firstCalendarDate.getTime() - WEEK_MILISEC);
   }else{
     firstCalendarDate = new Date(firstCalendarDate.getTime() - DAY_MILISEC * (getDay(firstCalendarDate)));
   }

   
  var daysN=0;
   
  let dates = [];
   
  //заполняем все осталное
  for(var i = 0; i < 7; i++)
  {
     dates[i] = [];
     for(var j=0; j<7; j++)
     {
       dates[i][j]=(new Date(firstCalendarDate.getTime() + daysN * DAY_MILISEC));
       daysN++;
     }  
  }
  
  return dates;
};


