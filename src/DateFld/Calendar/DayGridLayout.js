
import React, {useEffect} from 'react';
import {DayGridDayLayout} from './DayGridDayLayout'
import * as ST from './../../common'

export function DayGridLayout(props)
{

  let {selDate, dates, buildDate} = props;
  
 
  
  let d = ['пн', 'вт', 'ср', 'чт', 'пт', 'cб','вс'];
  let daysHeader = []
  for(var i = 0; i < d.length; i++)
  {
    let color = '';
    if(d[i] == 'cб' || d[i] == 'вс')
    {
      color = 'red'
    }
    daysHeader.push(<td key={"h-"+i} style={{color: color}} className="st-calendar-day-th">{d[i]}</td>)
  }

  const onDayClick = (date) =>
  {
    if(ST.isFunction(props.onDayClick))
    {
      props.onDayClick(date)
    }
  }

  let rows = [];
  for(let i = 0; i < 6; i++)
  {
    let tds = [];
    for(let j = 0; j < 7; j++)
    {
      tds.push(<DayGridDayLayout onClick={onDayClick} key={"d-"+i+'-'+j} date={dates[i][j]} selDate={selDate} buildDate={buildDate} />);
    }
    let newRow = <tr key={"rd-"+i}  >{tds}</tr>;
    rows.push(newRow);
  }
   
  return  (<table>
            <tbody>
              <tr>
                {daysHeader}
              </tr>
              {rows}
            </tbody>
          </table>);
}