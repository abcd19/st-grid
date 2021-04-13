import * as ST from './../../common';
import './Calendar.css';
import {DayGrid} from './DayGrid';
import {ComboboxFldLayoutEdit as Combobox} from './../../Combobox/ComboboxFldLayoutEdit';
import React from 'react'


export class Calendar
{
  
  constructor(data)
  {
    this._data = data;   
    this._isOpened = false;     
    this.selMonth = Number(new Date().getMonth());
    this.selYear = Number(new Date().getFullYear());
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
  };
  
  close()
  {
    this.layout.remove();
    this._isOpened = false;
  };
  
  isOpened()
  {
    return this._isOpened;
  };
  
  //отобразить календарь на дату
  showOnDate(date, selDate)
  {
    if(this.isOpened())
    {
      this.close();
    }
    var self = this;
    
    if(ST.isUndefined(this.layout))
    {
      this.layout = this._createLayout(this._data['wrapper']);
      
     

      var monthNow =  Number(new Date().getMonth());
      this.renderMonthCombo(monthNow);

      var yearNow = Number(new Date().getFullYear());
      this.renderYearCombo(yearNow)

      
      this.dayGrid = new DayGrid({
        wrapper: this.layout.dayGrid,
        handler: {
          click: function(val){
            
            if(ST.isFunction(self._data['handler']['clickOnDayGrid']))
            {
              self._data['handler']['clickOnDayGrid'](val);
            }
          }
        },
      });
      
      var elemcordHieght = Math.ceil(this._data['wrapper'].getBoundingClientRect().top);
      var windHeight = Math.ceil(document.documentElement.clientHeight);
      if((windHeight - elemcordHieght) < 280)
      {
        var CALENDARHEIGHT = 243;
        var INPUTHEIGHT = 25;
        this.layout.table.style.top = (elemcordHieght - (CALENDARHEIGHT+INPUTHEIGHT)) + 'px';
      }else{
        this.layout.table.style.top = '';
      }
      
      
    }
    
    this.dayGrid.showOnDate(date, selDate);
    
    this.layout.append();
    
    var self = this;


    var t = this._data['wrapper'].getBoundingClientRect();
    this.layout.table.style.left = Math.ceil(t['left'])+'px';
    this.layout.table.style.top = Math.ceil(t['top'])+'px';
    
    this._isOpened = true;
  };
  
  onChangeMonth(val)
  {
    this.selMonth = val['raw'];
    this.dayGrid.showOnDate(new Date(this.selYear, this.selMonth, 1));
    this.renderMonthCombo(this.selMonth);
  }

  onChangeYear(val)
  {
    this.selYear = val['raw'];
    this.dayGrid.showOnDate(new Date(this.selYear, this.selMonth, 1));
    this.renderYearCombo(this.selYear);
  }

  //отрендерить комбобокс с выбором года
  renderYearCombo(yearNow)
  {
    
   var min = yearNow - 45,
    max = yearNow + 46;
            
    var items = [];
    for(var i = min; i < max; i++)
    {
      items.push({
        display: i, raw: i
      });
    }

    ReactDOM.render(
      <div>
        <Combobox onChange={this.onChangeYear} disableSearch={true}  val={{raw: yearNow}} items={items}/>
      </div>
    , this.layout.year);
  }

  //отрендерить комбобокс выбором месяца
  renderMonthCombo(monthNow)
  {
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

    ReactDOM.render(
      <div>
        <Combobox onChange={this.onChangeMonth} disableSearch={true} val={{raw: monthNow}} items={months}/>
      </div>
    , this.layout.month);
  }

  _createLayout(wrapper)
  {
   
    var table = document.createElement('table');
    table.className= 'st-calendar-table';
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.className = 'st-calendar-year';
    var td2 = document.createElement('td');
    td2.className = 'st-calendar-month';
    var td3 = document.createElement('td');
    td3.className = 'st-calendar-td';
    td3.colSpan = '2';
    
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr2.appendChild(td3);
    
    table.appendChild(tr1);
    table.appendChild(tr2);
    return {
      append: function(){
        wrapper.appendChild(table);
      },
      remove: function(){
          if(wrapper.contains(table) == true)
          {
            wrapper.removeChild(table);
          }
      },
      year: td1,
      month: td2,
      dayGrid: td3,
      table: table
    }
  };
};