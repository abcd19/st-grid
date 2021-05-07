import * as ST from '../common'
import React from 'react';
import {ListItemLayout} from './ListItemLayout'
import {SearchFldLayoutEdit} from './SearchFldLayoutEdit'
import {calcRank} from '../findWords';

//ширина списка при котрытии
export const WIDTH = 300;
//ширина элемента списка при открытии
export const LIST_ITEM_WIDTH = WIDTH-5;
//максимальная высота списка
export const MAXHEIGHT = 250;

export type typeComboValue = {
  raw?: string | number | boolean,
  display?: string | number | boolean,
}

export interface IListLayoutProps {
  handler: {
    change: (val?: typeComboValue) => void
  };
  items: typeComboValue[];
  cordBtnLeft: number;
  cordBtnTop: number;
  listWidthPix: number;
  disableSearch?: boolean;
  selectedVal?: string | number | boolean;
}

export interface IListLayoutState {
  isFiltred: boolean;
  filterdItems: typeComboValue[];
}

// combobox list
export class ListLayout extends React.Component<IListLayoutProps, IListLayoutState>{
    
    private genDiv: React.RefObject<HTMLDivElement>;

    /**
     * @constructor
     * @param {type} data
     */
    constructor(props: IListLayoutProps)
    {
      super(props);
      this.clickItemHandle = this.clickItemHandle.bind(this);
      this.genDiv = React.createRef();

      this.changeSearchHandle = this.changeSearchHandle.bind(this);
      this.state ={
        filterdItems: [],
        isFiltred: false
      }
    }

    clickItemHandle(val?: typeComboValue): void
    {
      if(ST.has(this.props,'handler.change'))
      {
        this.props['handler']['change'](val);
      }
    }

    changeSearchHandle(val?: string): void
    {

      const ar = [];
      for(let i = 0;  i < this.props.items.length; i++)
      {
        ar[i] = this.props.items[i]['display'];
      }

      const ranked = calcRank(ar,  val,{
        deleteElementByRankZero: true
      });

      const newItems = [];

      for(let i = 0; i < ranked.length; i++)
      {
          const elem = ranked[i]['elemLink'];
          newItems.push(this.props.items[elem]);
      }

      this.setState({filterdItems: newItems, isFiltred: true});
    }

    componentDidMount(): void {
      let {cordBtnLeft, cordBtnTop, listWidthPix} = this.props;
      
      if(ST.isNumber(listWidthPix) == false)
      {
        listWidthPix = WIDTH;
      }

      if(this.genDiv && this.genDiv.current 
        && this.genDiv.current.offsetParent && this.genDiv.current.offsetParent.nodeName != 'BODY')
      {
        const offsetParent = this.genDiv.current.offsetParent.getBoundingClientRect();
        
        cordBtnLeft =  cordBtnLeft - offsetParent.left;
        cordBtnTop =  cordBtnTop - offsetParent.top;
      }

      const left = cordBtnLeft - listWidthPix + 30;
      let top = cordBtnTop + 30;
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

      top = top + getBodyScrollTop(); 
      const r = document.documentElement.clientHeight-Math.ceil(top)-20;
      if(r <= MAXHEIGHT)
      {
        top = top - MAXHEIGHT;
      }

      if(this.genDiv && this.genDiv.current)
      {
        this.genDiv.current.style.left = left + getBodyScrollLeft() + 'px';
        this.genDiv.current.style.top = top + 'px';
      }
      
      const prevDef = (e: Event) => { e.stopPropagation() };

      if(this.genDiv && this.genDiv.current)
      {
        if ('onwheel' in document)
        {
          // IE9+, FF17+, Ch31+
          this.genDiv.current.addEventListener("wheel", prevDef, { passive: false });
        } else if ('onmousewheel' in document) {
          this.genDiv.current.addEventListener("mousewheel", prevDef, { passive: false});
        } else {
          // Firefox < 17
          this.genDiv.current.addEventListener("MozMousePixelScroll", prevDef, { passive: false});
        }
      }

    }

    render(): React.ReactElement {
      
      const items = [];
      let {listWidthPix} = this.props;
      
      let itemsListWidthPix;
      if(ST.isNumber(listWidthPix) == false)
      {
        listWidthPix = WIDTH;
        itemsListWidthPix = listWidthPix-5;
      }else{
        itemsListWidthPix = listWidthPix-5;
      }
      
      if(this.state.isFiltred == false)
      {

        for(let i = 0; i < this.props.items.length; i++)
        {
          let isSelected = false;
          if(this.props.selectedVal == this.props.items[i].raw)
          {
            isSelected = true;
          }

          const newItem = <ListItemLayout setScroll = {isSelected} itemsListWidthPix={itemsListWidthPix} isSelected= {isSelected} key ={i} val ={ this.props.items[i] } onClick = { this.clickItemHandle } />;
          
          items.push(newItem);
        }
      }else{ 

        for(let i = 0; i < this.state.filterdItems.length; i++)
        {
          let isSelected = false;
          if(this.props.selectedVal == this.state.filterdItems[i].raw)
          {
            isSelected = true;
          }
          const newItem = <ListItemLayout setScroll = {i == 0?true: false}  isSelected= {isSelected} key ={i} val ={ this.state.filterdItems[i] } onClick = { this.clickItemHandle } />;
          
          items.push(newItem);
        }

      }

      let searchBlock;
      if(!this.props.disableSearch && this.props.items.length > 12)
      {
        searchBlock = <tr>
                          <td>
                            <div><SearchFldLayoutEdit onSearchBtnClick = { this.changeSearchHandle } onChangeDelay = { this.changeSearchHandle } /></div>
                          </td>
                        </tr>;
      }
      
      return(
        <div id="ListLayout" ref = {this.genDiv}  style= {{background: 'white', width: listWidthPix,  boxSizing: 'border-box', zIndex:100, position: 'absolute', border: '1px solid gray'}}>
          <table style={{borderSpacing: '2px', width: listWidthPix, borderCollapse: 'separate'}}>
            <tbody>
              {searchBlock}
              <tr>
                <td style={{padding: '0px', margin: '0px'}}>
                  <div id="ListLayout-item" style={{maxHeight: MAXHEIGHT, width: itemsListWidthPix, overflow: 'auto', boxSizing: 'content-box'}} /*onWheel={this.onWheelHandle}*/>
                    {items}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>);
    }
}
