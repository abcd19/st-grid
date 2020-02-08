import * as ST from './../common'
import {CELL_HEIGHT} from './Items/ItemsLayout';
/**
 * Обработчик скролла по X
 * @param {*} e 
 */
export function onItemScrollX(e)
{
  //элементы скроляется через рефы. Fix: Переделать через состояние
  var scroll = this.scrollBottomRef.current.scrollLeft;
  this.bodyDivRef.current.scrollLeft = scroll;
  this.headerDivRef.current.scrollLeft = scroll;
}

/**
 * Обработчик скролла по Y
 * @param {*} e 
 */
export function onItemScrollY(e)
{
  //на сколько сильно прокручена страница
  let delta = e.deltaY;

  //определяем величину предыдущего скролла
  let curScroll = this.scrollRightRef.current.scrollTop;
  let newScroll;
  //если скролл был вниз
  if(delta > 0 )
  {
    newScroll  = curScroll;

  
  //если скролл был вверх
  }else{
    newScroll  = curScroll;
    //не скролим таблицу в минус
    if(newScroll < 0)
    {
      newScroll = 0;
    }
  }

  //перерисовываем множество видимых строк в Items
  //расчитываем первую видимую строку
  let newFirstVisibleRow = Math.floor(newScroll/CELL_HEIGHT);
  this.setState({firstVisibleRowI: newFirstVisibleRow});
}


/**
 * Обработчик скролла колесиком мышки по items
 * @param {*} e 
 */
export function onItemMouseWheelScrollingY(e)
{
  //на сколько сильно прокручена страница
  let delta = e.deltaY;
  
  //на сколько прокрученно мышкой
  //let rowScrolled = Math.round(Math.abs(delta)/CELL_HEIGHT);
    
  //определяем величину предыдущего скролла
  let curScroll = this.scrollRightRef.current.scrollTop;

  //определяем виличну новго скролла
  //какова бы не была велечина скролла скрллим всегда на размера строки
  let newScroll;
  //если скролл был вниз
  if(delta > 0 )
  {
    newScroll  = curScroll + Math.abs(delta);
    //не скроллим таблицу в плюс
    let maxScroll = this.scrollRightRef.current.scrollHeight - this.scrollRightRef.current.offsetHeight;
    if(newScroll > maxScroll)
    {
      newScroll = maxScroll;
    }
  
  //если скролл был вверх
  }else{
    newScroll  = curScroll - Math.abs(delta);
    //не скролим таблицу в минус
    if(newScroll < 0)
    {
      newScroll = 0;
    }
  }

  //устанавливаем величину скролла слою-Скролу
  this.scrollRightRef.current.scrollTop = newScroll;

  //перерисовываем множество видимых строк в Items
  let newFirstVisibleRow = Math.floor(newScroll/CELL_HEIGHT);
  this.setState({firstVisibleRowI: newFirstVisibleRow});
}

 /**
   * Обработчик события смена ширины ячейки заголовка
   */
export function onChangeHeaderCellWidth(cellAlias, width)
  {
    let {columns} = this.props;

    for(let i =0; i < columns.length; i++)
    {
      if(columns[i]['alias'] == cellAlias)
      {
        columns[i]['widthPix'] = width;
        this.setState({columns: columns});
        return;
      }
    }
  }