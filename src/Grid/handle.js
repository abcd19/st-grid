import * as ST from './../common'
import {CELL_HEIGHT} from './Items/ItemsLayout';

//ивент onItemMouseWheelScrollingY триггерит onItemScrollY
// этот флаг помогает предотвратить повтроную перерисовку строк при скролле колесиком
//let prevScrollYEvent = false;


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
  //console.log('oonItemScrollY')

  /*if(prevScrollYEvent == true)
  {
    prevScrollYEvent = false;
    return;
  }*/
 
  //определяем величину предыдущего скролла
  let curScroll = this.scrollRightRef.current.scrollTop;
  let newScroll = curScroll;

  //максимально возможный скролл
  let maxScroll = this.scrollRightRef.current.scrollHeight - this.scrollRightRef.current.offsetHeight;

  //не скролим таблицу выше чем возможно
  if(newScroll < 0)
  {
    newScroll = 0;
  }

  //перерисовываем множество видимых строк в Items
  //расчитываем первую видимую строку
  let newFirstVisibleRow = Math.floor(newScroll/CELL_HEIGHT);

  //Cлучай когда доскролили до конца таблицы
  if(newScroll == maxScroll)
  {
    //но скрол был на величину меньше высоты строки
    if(newScroll < CELL_HEIGHT)
    {
      //проскролим до конца
      newFirstVisibleRow = newFirstVisibleRow + 1;
    }
    
  }


  this.setState({firstVisibleRowI: newFirstVisibleRow});
}


/**
 * Обработчик скролла колесиком мышки по items
 * @param {*} e 
 */
export function onItemMouseWheelScrollingY(e)
{
  
  //на сколько сильно крутонули колесо
  let delta = e.deltaY;
      
  //определяем величину предыдущего скролла
  let curScroll = this.scrollRightRef.current.scrollTop;

  //определяем виличну новго скролла
  //какова бы не была велечина скролла скрллим всегда на размера строки
  let newScroll;

  //максимально возможноый скролл
  let maxScroll = this.scrollRightRef.current.scrollHeight - this.scrollRightRef.current.offsetHeight;
  
  //прокручиваем строго на 2 строки вверх/вниз
  //в некоторых браузерах сколеско отробатываем по разному
  // в Firefox скролится на 3 пикселя, как в Хроме на 100
  if(delta > 0)
  {
    delta = CELL_HEIGHT*2;
  }else{
    delta = -1*(CELL_HEIGHT*2)
  }


 
  //если скролл был вниз
  if(delta > 0 )
  {
    //если скрол в самом низу, то скролить бльше не нужно
    if(curScroll == maxScroll)
    {
      return;
    }

    newScroll  = curScroll + Math.abs(delta);

    //не скроллим таблицу в плюс
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

    //если мы наверху скрола, то скролить больше не нужно
    if(curScroll == 0)
    {
      return;
    }
  }

  //устанавливаем величину скролла слою-Скролу
  //такая установка триггрерит ивент onItemScrollY
  //предотвратим этот вызов
  //prevScrollYEvent = true;
  this.scrollRightRef.current.scrollTop = newScroll;

  //перерисовываем множество видимых строк в Items
  let newFirstVisibleRow = Math.floor(newScroll/CELL_HEIGHT);

  //Cлучай когда доскролили до конца таблицы
  if(newScroll == maxScroll)
  {
    //но скрол был на величину меньше высоты строки
    if(newScroll < CELL_HEIGHT)
    {
      //проскролим до конца
      newFirstVisibleRow = newFirstVisibleRow + 1;
    }
    
  }


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