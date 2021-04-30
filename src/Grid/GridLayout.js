import * as ST from '../common';
import React from 'react';

import {HeaderLayout} from './Header/HeaderLayout';
import {ItemsLayout, CELL_HEIGHT} from './Items/ItemsLayout.tsx';
import {ToolbarLayout} from './Toolbar/ToolbarLayout'
import {StringFldCell  as StringFldCell} from './../StringFld/StringFldCell'
import {calcSumColumnsWidth} from './calcSumColumnsWidth';
import './GridLayout.css'
import {onItemScrollX, onItemScrollY, onItemMouseWheelScrollingY, onChangeHeaderCellWidth} from './handle'

/**
 * Шаблон для таблицы/дерева
 */
class GridLayout extends React.Component {
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);
    this.props = props;
    this.state = {};
    this.SCROLL =  20;
    this.TOOLBAR_HEIGHT = 34;
    this.HEADER_HEIGHT = 30;

    this.state = {
      //номер первой видимой строки в items
      firstVisibleRowI: 0,
      //флаг скролла до последнего айтема
      scrollToLastItem: false,
    }

    this.scrollBottomRef = React.createRef();
    this.scrollRightRef = React.createRef();
    this.bodyDivRef = React.createRef();
    this.headerDivRef = React.createRef();

    this.onItemScrollX = onItemScrollX.bind(this);
    this.onItemMouseWheelScrollingY = onItemMouseWheelScrollingY.bind(this);
    this.onItemScrollY = onItemScrollY.bind(this);
    this.onChangeHeaderCellWidth = onChangeHeaderCellWidth.bind(this);

    this.onClickHeaderCell = this.onClickHeaderCell.bind(this);
  };
  

  onClickHeaderCell(alias, order)
  {
    if(ST.isFunction(this.props.onClickHeaderCell))
    {
      this.props.onClickHeaderCell(alias, order);
    }
  } 

  componentDidMount()
  {
    
    //чтобы не крутилась страница в chrom дисеблим скролл с флагом  passive: false
    const prevDef = (e) => e.preventDefault ? e.preventDefault(): (e.returnValue = false);
    
    if ('onwheel' in document)
    {
      // IE9+, FF17+, Ch31+
      this.bodyDivRef.current.addEventListener("wheel", prevDef, { passive: false });
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      this.bodyDivRef.current.addEventListener("mousewheel", prevDef, { passive: false });
    } else {
      // Firefox < 17
      this.bodyDivRef.current.addEventListener("MozMousePixelScroll", prevDef, { passive: false });
    }

    
    this.prepareScrollToLastItem();
  }

  componentDidUpdate()
  {
    this.prepareScrollToLastItem();
  }

  //todo переделать
  prepareScrollToLastItem()
  {
    //Если передан флаг скроллинга до последнего айтема
    if(this.props.scrollToLastItem === true)
    {
      let newScroll = this.state.firstVisibleRowI * CELL_HEIGHT;
      //за счет отступа вконце строк в виде еще одной скрытой строки таблицу можно проскролить еще больше
      newScroll = newScroll + CELL_HEIGHT;
      this.scrollRightRef.current.scrollTop = newScroll;  
      //this.props.scrollToLastItemHandle(false);
    }
  }

  render()
  {
    //запролняем дефолтные значения
    let {columns, items} =  this.props;
    for(let i = 0; i < this.props.columns.length; i++)
    {
      ST.defaults(columns[i],
        {
          //ширина = 100 px
          widthPix: 100,
          visible: true,
          //по умолчанию текстовое поле
          type: {
            constr: StringFldCell,
            settings:{}
          }
        });

        //у скрытых столбцов ширина = 0;
        if(columns[i]['visible'] == false)
        {
          columns[i]['widthPix'] = 0;
        }
    }


    //ширина таблицы целиком
    let width = this.props.width - this.SCROLL;
    
    //высота правого скролла расчитывается на основе колва ячеек
    let rightScrollHeight = items.length*CELL_HEIGHT;

    //высота контентной части таблицы
    let bodyContentHeight = this.props.height - this.SCROLL - this.TOOLBAR_HEIGHT - this.HEADER_HEIGHT;
    //console.log(this.HEADER_HEIGHT)
    //ширина контентной части таблицы
    let bodyContentWidth = calcSumColumnsWidth(this.props.columns);

    //к этой высоте можно прибавить одну строку тк для красоты отображения вконце строк 
    //в тело добавляется еще одна строка
    //в конец строк добавляется еще одна пустая невидимая строка free-spaceTr высотой 30 
    if(rightScrollHeight > bodyContentHeight)
    {
      rightScrollHeight = rightScrollHeight + CELL_HEIGHT;
    }
    
    //Если передан флаг скроллинга до последнего айтема
    if(this.props.scrollToLastItem === true)
    {
      //расчитываем сколько строк еще влезает высоту тела
      //округляем в большую сторону
      let visibleRowsCount = Math.ceil(bodyContentHeight / CELL_HEIGHT);
      
      this.state.firstVisibleRowI = items.length-visibleRowsCount +1;

    }
    
    //случай когда изменили высоту таблицы и влезли все строки
    if(bodyContentHeight > rightScrollHeight)
    {
      this.state.firstVisibleRowI = 0;
    }

    return(<table className="st-grid-layout">
      <tbody>
        <tr>
          <td>
            <div style={{marginBottom: "2px", width: width}} className="st-grid-toolbar-div">
              <ToolbarLayout items = {this.props.toolbar.items} />
            </div>
          </td>
          <td className="st-grid-toolbar-rightScroll"></td>
        </tr>
        <tr>
          <td className="st-grid-header-td">
            <div className="st-grid-header-div" ref={this.headerDivRef} style={{height: '32px', width: width}}>
              <div className="st-grid-header-content-div" style={{height: '32px', width: bodyContentWidth+'px'}}>
                <HeaderLayout clickHeaderCell={this.onClickHeaderCell} sortingFlag={this.props.sortingFlag} columns={columns} onChangeHeaderCellWidth = {this.onChangeHeaderCellWidth}  />
              </div>
            </div>
          </td>
          <td className="st-grid-header-rightScroll"></td>
        </tr>
        <tr>
          <td className="st-grid-body-td">
            <div  onWheel={ this.onItemMouseWheelScrollingY } ref ={this.bodyDivRef} className="st-grid-body-div" style={{width: width, height: bodyContentHeight}}>
              <div className="st-grid-body-content-div" style={{width: bodyContentWidth+'px'}}>
                <ItemsLayout 
                  columns={columns} 
                  onMouseDownItem = {this.props.onMouseDownItem}
                  onMouseEnterItem = {this.props.onMouseEnterItem}
                  onMouseLeaveItem = {this.props.onMouseLeaveItem}
                  onDoubleClickItem = {this.props.onDoubleClickItem}
                  onClickItem = {this.props.onClickItem}
                  onChangeItem = {this.props.onChangeItem}  
                  items = {items} 
                  height={bodyContentHeight} 
                  firstVisibleRowI= {this.state.firstVisibleRowI} />
              </div>
            </div>
          </td>
          <td className="st-grid-body-rightScroll">
            <div onScroll={ this.onItemScrollY } ref={this.scrollRightRef} className="st-grid-rightScroll-div" style={{width: this.SCROLL+'px', height: bodyContentHeight }}>
              <div style={{height: rightScrollHeight}}></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div onScroll={ this.onItemScrollX } ref={this.scrollBottomRef} className="st-grid-bottomScroll-div" style={{height: this.SCROLL+'px', width: width}}>
              <div className="st-grid-bottomScroll-content-div" style={{height: this.SCROLL+'px', width: bodyContentWidth+'px'}}></div>
            </div>
          </td>
          <td></td>
        </tr>  
      </tbody>
    </table>);
  }

}

export {GridLayout}