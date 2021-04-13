
import {Layout} from './Layout';
import {getDay, DAY_MILISEC, WEEK_MILISEC} from '../functions';

export class DayGrid
{
  
  constructor(data)
  {
    this._data = data;
    this.buildDate = undefined;
    this.dates = undefined;

  };
  
  getDates()
  {
    return this.dates;
  };
  
  getBuildDate()
  {
    return this.buildDate;
  };
  
  calcData(buildDate)
  {
    this.buildDate = buildDate;
    
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
     
    this.dates = [];
     
    //заполняем все осталное
    for(var i = 0; i < 7; i++)
    {
       
       this.dates[i] = [];
       for(var j=0; j<7; j++)
       {
         this.dates[i][j]=(new Date(firstCalendarDate.getTime() + daysN * DAY_MILISEC));
         daysN++;
       }  
    }
    
    return this.dates;
  };
  
      
  showOnDate(buildDate, selectedDate)
  {
    this.selectedDate = selectedDate;
    this.calcData(buildDate);
    
    this.layout = new Layout({
      'object': this,
      'handler': function(){}
    });
    
    this.layout.commit();

  };
  
  reset()
  {
    this.layout.remove();
  };
};