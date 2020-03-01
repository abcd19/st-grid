import * as ST from './../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {ListItemLayout} from './ListItemLayout'
import {SearchFldLayout} from './SearchFldLayout'
import {calcRank} from './../findWords';

/**
 * @class
 */
class ListLayout extends React.Component{
    
    /**
     * @constructor
     * @param {type} data
     */
    constructor(props)
    {
      super(props);
      this.clickItemHandle = this.clickItemHandle.bind(this);
      this.genDiv = React.createRef();
      this.changeSearchHandle = this.changeSearchHandle.bind(this);
      this.state ={
        //массив с отфильтрованными строками при поиске
        filterdItems: [],
        //флаг фильтр пременен
        isFiltred: false
      }
      //this.onWheelHandle = this.onWheelHandle.bind(this);
    };

    clickItemHandle(val)
    {
      if(ST.has(this.props,'handler.change'))
      {
        this.props['handler']['change'](val);
      }
    }

    /*onWheelHandle(e)
    {
      //при скроллинге листа скроллится только он
      //Если убрать то скроллиться грид      
      e.stopPropagation();
    }*/

    //фильтрация элементов при поиске
    changeSearchHandle(val)
    {
      //ищем по значениям для отображения
      let ar = [];
      for(var i = 0;  i < this.props.items.length; i++)
      {
        ar[i] = this.props.items[i]['display'];
      }

      //ранжируем массив
      var ranked = calcRank(ar,  val,{
        deleteElementByRankZero: true //удаляем элементы с нулевым рангом
      });

      //создаем новый массив элементов, который удовлетворяет поиску
      let newItems = [];

      //Если ничего не найдено
      /*if(ranked.length === 0)
      {
        //newItems = this.props.items;
        this.setState({filterdItems: [], isFiltred: false});
        return;
      }*/

      for(var i = 0; i < ranked.length; i++)
      {
          var elem = ranked[i]['elemLink'];
          newItems.push(this.props.items[elem]);
      }

      this.setState({filterdItems: newItems, isFiltred: true});
      console.dir(newItems);
    }

    componentDidMount() {
      //расчет позиции для отображения
      let {left, top, width} = this.genDiv.current.parentNode.getBoundingClientRect();
      this.genDiv.current.style.width = width+'px';
     
      //если один из парентов имеет позицию fixed или absolute то позицию нужно считать от него
      if(this.genDiv.current.offsetParent && this.genDiv.current.offsetParent.nodeName != 'BODY')
      {
        //console.dir(this.genDiv.current.offsetParent)
        var offsetParent = this.genDiv.current.offsetParent.getBoundingClientRect();
        
        left =  left - offsetParent.left;
        top =  top - offsetParent.top;
      }

      //console.dir(this.genDiv.current.offsetParent.getBoundingClientRect());
      function getBodyScrollTop()
      {
        return (document.documentElement && document.documentElement.scrollTop) || 
        (document.body && document.body.scrollTop);
      }

      function getBodyScrollLeft()
      {
        return (document.documentElement && document.documentElement.scrollLeft) || 
        (document.body && document.body.scrollLeft);
      }

      // у потомка берем его отступ и прибавляем размер скролла страницы
      this.genDiv.current.style.left = left + getBodyScrollLeft() + 'px';
      this.genDiv.current.style.top = top + getBodyScrollTop() + 'px';

          //чтобы не крутилась страница в chrom дисеблим скролл с флагом  passive: false
      const prevDef = (e) => e.stopPropagation();
      
      if ('onwheel' in document)
      {
        // IE9+, FF17+, Ch31+
        this.genDiv.current.addEventListener("wheel", prevDef, { passive: false });
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        this.genDiv.current.addEventListener("mousewheel", prevDef, { passive: false });
      } else {
        // Firefox < 17
        this.genDiv.current.addEventListener("MozMousePixelScroll", prevDef, { passive: false });
      }


    }

    render(){
      
      let items = [];

      //Если нет фильтрации
      if(this.state.isFiltred == false)
      {

        for(let i = 0; i < this.props.items.length; i++)
        {
          let isSelected = false;
          if(this.props.selectedVal == this.props.items[i].raw)
          {
            isSelected = true;
          }

          let newItem = <ListItemLayout setScroll = {isSelected} isSelected= {isSelected} key ={i} val ={ this.props.items[i] } onClick = { this.clickItemHandle } />;
          
          items.push(newItem);
        }
      }else{ //Если есть фильтрация

        for(let i = 0; i < this.state.filterdItems.length; i++)
        {
          let isSelected = false;
          if(this.props.selectedVal == this.state.filterdItems[i].raw)
          {
            isSelected = true;
          }

          let newItem = <ListItemLayout setScroll = {false}  isSelected= {isSelected} key ={i} val ={ this.state.filterdItems[i] } onClick = { this.clickItemHandle } />;
          
          items.push(newItem);
        }

      }

      let searchBlock;
      //поле поиска показываем только если айтемов больше 12
      if(!this.props.disableSearch && this.props.items.length > 12)
      {
        searchBlock = <tr>
                          <td>
                            <div><SearchFldLayout onChangeDelay = { this.changeSearchHandle } /></div>
                          </td>
                        </tr>;
      }
      
      const itemsVisibleMax = 7;

      const itemHeight = 23;

      let itemsDivHeight = itemsVisibleMax * itemHeight;
      if(items.length < itemsVisibleMax)
      {
        itemsDivHeight = items.length*itemHeight
      }
      console.log('items', items.length)
      return(
        <div id="ListLayout" ref={this.genDiv}  style= {{background: 'white', width: "100%",  boxSizing: 'border-box', zIndex:'100', position: 'absolute', border: '1px solid gray'}}>
          <table style={{borderSpacing: '2px', borderCollapse: 'separate', width: '100%'}}>
            <tbody>
              {searchBlock}
              <tr>
                <td style={{padding: '0px', margin: '0px'}}>
                  <div id="ListLayout-item" style={{height: itemsDivHeight+'px', overflow: 'auto', boxSizing: 'content-box'}} /*onWheel={this.onWheelHandle}*/>
                    {items}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>);
    }
};

export {ListLayout}