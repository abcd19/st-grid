import * as ST from '../common';
import React from 'react';
import {FieldLayoutEdit} from '../StringFld/FieldLayoutEdit';
import {ListLayout} from './ListLayout'


export class ComboboxFldLayoutEdit extends React.Component{
    
    /**
     * @constructor
     */
    constructor(props)
    {
      super(props);
      
      this.state = {
        listIsOpened: false,
        cordLeft: 0,
        cordTop: 0
      };
      
      this.buttons = {
        items: []
      };

      this.refTable = React.createRef();

      this.buttons['items'].push({
        name: 'choiseBtn',
        settings: { 
          handler:{
            click: this.onClickChoiceHandle.bind(this),
            //останавливаем всплытие ивентов 
            //при нажатии на нопку выбора
            //считаем что если пользователь нажал на копку, 
            //то он будет выбирать
            /*mousedown: function(e){
             // e.stopPropagation();
            },*/
          },
          imageName: 'combobox'
        }
      });

      this.onClickListElement = this.onClickListElement.bind(this);
      this.runClose = this.runClose.bind(this);
    };


    onClickChoiceHandle(e)
    {
      
      if(this.state.listIsOpened == true)
      {
        this.setState({listIsOpened: false})
      }else{
        let {left, top} = e.currentTarget.getBoundingClientRect();
        this.setState({
          cordBtnLeft: left,
          cordBtnTop: top,
          listIsOpened: true})
      }
    }

    onClickListElement(val)
    {
      this.onClickChoiceHandle();
      if(ST.isFunction(this.props.onChange))
      {
        this.props.onChange(val)
      }
    }

    //закрыть список
    runClose(e)
    {
      //в любом случае отписываем события, что бы ивент не завис
      window.document.body.removeEventListener("mousewheel", this.runClose);
      window.document.body.removeEventListener("mousedown", this.runClose);
      //Если кликаем гдето в документе или скролим, то закрываем список
      if(e.target && this.refTable.current && this.refTable.current.contains(e.target) == false)
      {
        this.setState({listIsOpened: false})
      }
    }

    //находит значение в виде {raw,display} по сырому значению raw
    findValByRawVal(rawVal)
    {
      if(ST.isUndefined(this.props.items))
      {
        return undefined;
      }

      let val = this.props.items.filter((item) =>{
        return item['raw'] == rawVal;
      });
      
      return val[0];
    }


    render()
    {
      let {val, items, listWidthPix} = this.props;
      
      if(ST.isUndefined(items))
      {
        items = [];
      }

      let realVal ={
        raw: undefined,
        display: ''
      };
      
      if(ST.isObject(val))
      {
        
          //по сырому значению ищем значение в массиве
          let temp = this.findValByRawVal(val['raw']);
          if(ST.isObject(temp))
          {
            realVal = temp;
          }
      }

      let handler = {
        change: this.onClickListElement
      }

      let fieldLayout = <FieldLayoutEdit 
                          clearBtnFlag = {this.props['clearBtnFlag']}
                          prepareGridDisplay = { this.props.prepareGridDisplay }  
                          inputVal = {  realVal['display'] } 
                          onChange = { this.props['onChange'] }
                          buttons ={ this.buttons } 
                        />

      // При скроллинге страницы или клике-где-то нужно закрыть список
      //todo: придумать как сделать красивее
      window.document.body.removeEventListener("mousewheel", this.runClose);
      window.document.body.removeEventListener("mousedown", this.runClose);

      //если нужно открыть
      if(this.state.listIsOpened == true && ST.isArray(items) && items.length > 0)
      {        
        window.document.body.addEventListener("mousewheel", this.runClose);
        window.document.body.addEventListener("mousedown", this.runClose);

        return(
        <table ref ={this.refTable} cellPadding="0" cellSpacing="0" style={{padding: '0px', height:'25px', width: '100%'}}>
          <tbody>
            <tr>
              <td>
                {fieldLayout}
              </td>
            </tr>
            <tr>
              <td>
                <ListLayout cordBtnLeft={this.state.cordBtnLeft} listWidthPix={listWidthPix} cordBtnTop={this.state.cordBtnTop} disableSearch={this.props.disableSearch}  selectedVal = {realVal['raw'] } handler={handler}  items={items} />
              </td>
            </tr>
          </tbody>  
        </table>
        )
      }

      return (fieldLayout)
    }          
};