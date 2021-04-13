
import React, {useEffect} from 'react';
import * as ST from './../../common'
import {compareDate, isWeekend, isPreviousOrNextMonth, getOutputDate, getOutputMonth, DATE_NOW} from '../functions'


//ячейка - день на календаре
export function DayGridDayLayout(props)
{     
      let {date, selDate, buildDate} = props;

      let className = 'st-calendar-day-td';
      if(compareDate(date, DATE_NOW))
      {
        className = 'st-calendar-day-td st-calendar-day-tdToday';
        if(isWeekend(date))
        {
          className = className + ' st-calendar-day-tdWeekend';
        }
      }else if (isPreviousOrNextMonth(date, buildDate))
      {
        className = 'st-calendar-day-td st-calendar-day-tdprevNextMonth';
        if(isWeekend(date))
        {
          className = className +' calendar-floating-tdWeekendNot';
        }
      }else
      {
        className='st-calendar-day-td';
        if(isWeekend(date))
           className+=' st-calendar-day-tdWeekend';
        
      }

      if (selDate!= undefined && compareDate(date, selDate)) 
      {
        className +=' st-calendar-floating-tdSelected';
      }

      const onClick = () =>
      {
        if(ST.isFunction(props.onClick))
        {
          props.onClick(date)
        }      
      }

      let title = getOutputDate(date)+"."+getOutputMonth(date)+"."+date.getFullYear()
      return <td className onClick={onClick}  className={className} title={title}  >{date.getDate()}</td>;
}