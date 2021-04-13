import {compareDate, isWeekend, isPreviousOrNextMonth, getOutputDate, getOutputMonth} from '../functions'

export class Layout
{
  
  constructor(data)
  {
    this._data = data['object']['_data'];
    this._object = data['object'];
    this.isAdded = false;
    this.dom = undefined;
  };
  
  commit()
  {

    this.createDOM();
    this._data['wrapper'].innerHTML = '';
     
    if(this.isAdded == false) 
    {
      this._data['wrapper'].appendChild(this.dom.table);
      this.isAdded = true;
    };
    
  };
  
  createDOM()
  {    
    this.dom = {};
    this.dom.table = document.createElement('table');
    this.dom.table.className = 'st-calendar-day-table';
    var trH = document.createElement('tr');
    this.dom.table.appendChild(trH);
    var d = ['пн', 'вт', 'ср', 'чт', 'пт', 'cб','вс'];
    
    for(var i = 0; i < d.length; i++)
    {
      var th = document.createElement('th');
      th.className = 'st-calendar-day-th';
      
      if(d[i] == 'cб' || d[i] == 'вс')
      {
       th.style.cssText = 'color: red;';
      }
      
      th.innerHTML = d[i];
      trH.appendChild(th);
    }
    
    var dates =  this._object.getDates();
    
    var buildDate = this._object.getBuildDate();
    
    var selDate = this._object.selectedDate;
    
    var DATE_NOW = new Date(); //сегодняшняя дата
    
    var style;
       
    for(var i = 0; i < 6; i++)
    {
      var tr = document.createElement('tr');
      this.dom.table.appendChild(tr);

      for(var j = 0; j < 7; j++)
      {
        if(compareDate(dates[i][j], DATE_NOW))
        {
           style='st-calendar-day-td st-calendar-day-tdToday';
           if(isWeekend(dates[i][j]))
            style+= ' st-calendar-day-tdWeekend';
        } 
        else if (isPreviousOrNextMonth(dates[i][j], buildDate))
        {
          style='st-calendar-day-td st-calendar-day-tdprevNextMonth';
          if(isWeekend(dates[i][j]))
            style+=' calendar-floating-tdWeekendNot';
        }
          
        else
          {
           style='st-calendar-day-td';
           if(isWeekend(dates[i][j]))
            style+=' st-calendar-day-tdWeekend';
            
          }
 
        
        if (selDate!= undefined && compareDate(dates[i][j], selDate)) 
        {
            style +=' st-calendar-floating-tdSelected';
        }
//        else if (ST.fieldDate.compareDate(dates[i][j], DATE_NOW)) 
//        {
//            style+=' st-calendar-day-tdNow';
//        }
        var self = this;
          var td = document.createElement('td');
          tr.appendChild(td);
          var f = (function(){
            
             var t = td;
             return function() { self._object._data['handler']['click'].apply(self._object,[t.title]); }
          })();
          td.addEventListener('mousedown',f)
          td.className = style;
          td.title = getOutputDate(dates[i][j])+"."+getOutputMonth(dates[i][j])+"."+dates[i][j].getFullYear()
          td.innerHTML = dates[i][j].getDate();
      }
    }
    
    
    this.table = this.dom.table;
  };
  
  reset()
  {
    if(ST.isUndefined(this.dom))
    {
      return;
    };
    
    if(this.isAdded == true) 
    {
      this._data['wrapper'].removeChild(this.dom.table);
      this.isAdded = false;
    };
    
  };

};