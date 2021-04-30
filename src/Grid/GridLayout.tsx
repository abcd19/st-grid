import * as ST from '../common';
import React from 'react';

import {HeaderLayout} from './Header/HeaderLayout';
import {ItemsLayout, CELL_HEIGHT} from './Items/ItemsLayout';
import {ToolbarLayout} from './Toolbar/ToolbarLayout'
import {StringFldCell  as StringFldCell} from '../StringFld/StringFldCell'
import {calcSumColumnsWidth} from './calcSumColumnsWidth';
import './GridLayout.scss'
import {onItemScrollX, onItemScrollY, onItemMouseWheelScrollingY, onChangeHeaderCellWidth} from './handle'


export interface IGridLayoutProps {
  onClickHeaderCell: (alias: string, order: string) => void;
  scrollToLastItem: boolean;
  columns: any[];
  items: any[];
  height: number;
  width: number;
  sortingFlag: boolean;
  toolbar: any;
  onMouseDownItem: any;
  onMouseEnterItem: any;
  onMouseLeaveItem: any;
  onDoubleClickItem: any;
  onClickItem: any;
  onChangeItem: any;  
}

export interface IGridLayoutState {
  scrollToLastItem: boolean;
}

/**
 * Шаблон для таблицы/дерева
 */
class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {

  private SCROLL: number;
  private HEADER_HEIGHT: number;
  private TOOLBAR_HEIGHT: number;
  private scrollBottomRef: React.RefObject<HTMLDivElement>;
  private scrollRightRef: React.RefObject<HTMLDivElement>;
  private bodyDivRef: React.RefObject<HTMLDivElement>;
  private headerDivRef: React.RefObject<HTMLDivElement>;
  private onItemScrollX:()=>void;
  private onItemMouseWheelScrollingY:(this: any, e: any)=>void;
  private onItemScrollY: ()=>void;
  private onChangeHeaderCellWidth: (this: any, cellAlias: string, width: number)=>void;
  private firstVisibleRowI: number;

  /**
   * @constructor
   * @param {type} data
   */
  constructor(props: IGridLayoutProps)
  {
    super(props);
    this.SCROLL =  20;
    this.TOOLBAR_HEIGHT = 34;
    this.HEADER_HEIGHT = 30;
    this.firstVisibleRowI = 0;
    this.state = {
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
  }
  

  onClickHeaderCell(alias: string, order: string)
  {
    if(ST.isFunction(this.props.onClickHeaderCell))
    {
      this.props.onClickHeaderCell(alias, order);
    }
  } 

  componentDidMount()
  {
    
    //чтобы не крутилась страница в chrom дисеблим скролл с флагом  passive: false
    const prevDef = (e: any) => e.preventDefault ? e.preventDefault(): (e.returnValue = false);
    
    if(this.bodyDivRef && this.bodyDivRef.current)
    {
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
    if(this.props.scrollToLastItem === true && this.scrollRightRef && this.scrollRightRef.current)
    {
      let newScroll = this.firstVisibleRowI * CELL_HEIGHT;
      //за счет отступа вконце строк в виде еще одной скрытой строки таблицу можно проскролить еще больше
      newScroll = newScroll + CELL_HEIGHT;
      this.scrollRightRef.current.scrollTop = newScroll;  
      //this.props.scrollToLastItemHandle(false);
    }
  }

  render()
  {
    //запролняем дефолтные значения
    const {columns, items} =  this.props;
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
    const width = this.props.width - this.SCROLL;
    
    //высота правого скролла расчитывается на основе колва ячеек
    let rightScrollHeight = items.length*CELL_HEIGHT;

    //высота контентной части таблицы
    const bodyContentHeight = this.props.height - this.SCROLL - this.TOOLBAR_HEIGHT - this.HEADER_HEIGHT;
    //console.log(this.HEADER_HEIGHT)
    //ширина контентной части таблицы
    const bodyContentWidth = calcSumColumnsWidth(this.props.columns);

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
      const visibleRowsCount = Math.ceil(bodyContentHeight / CELL_HEIGHT);
      
     this.firstVisibleRowI = items.length-visibleRowsCount +1;

    }
    
    //случай когда изменили высоту таблицы и влезли все строки
    if(bodyContentHeight > rightScrollHeight)
    {
      this.firstVisibleRowI = 0;
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
                  firstVisibleRowI= {this.firstVisibleRowI} />
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