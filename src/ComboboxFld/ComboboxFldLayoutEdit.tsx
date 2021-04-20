import * as ST from '../common';
import React from 'react';
import {FieldLayoutEdit} from '../StringFld/FieldLayoutEdit';
import {ListLayout, typeComboValue} from './ListLayout'
import {IImgFieldLayoutEditBtn} from './../StringFld/FieldLayoutEdit';

export interface IComboboxFldLayoutEditProps {
  disableSearch?: boolean;
  onChange?: (val?: typeComboValue) => void;
  items: typeComboValue[];
  val?: typeComboValue;
  listWidthPix?: number;
  clearBtnFlag?: boolean;
  prepareGridDisplay?: boolean;
}

export interface IComboboxFldLayoutEditState {
  listIsOpened: boolean;
  cordLeft: number;
  cordTop: number;
  cordBtnLeft: number;
  cordBtnTop: number;
  
}

export class ComboboxFldLayoutEdit extends React.Component<IComboboxFldLayoutEditProps, IComboboxFldLayoutEditState>{
    
    private buttons: IImgFieldLayoutEditBtn;
    
    private refTable: React.RefObject<HTMLTableElement>;

    /**
     * @constructor
     */
    constructor(props: IComboboxFldLayoutEditProps)
    {
      super(props);
      
      this.state = {
        listIsOpened: false,
        cordLeft: 0,
        cordTop: 0,
        cordBtnLeft: 0,
        cordBtnTop: 0,
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
          },
          imageName: 'combobox'
        }
      });

      this.onClickListElement = this.onClickListElement.bind(this);
      this.runClose = this.runClose.bind(this);
    }


    onClickChoiceHandle(e?: React.MouseEvent): void
    {
      
      if(this.state.listIsOpened == true)
      {
        this.setState({listIsOpened: false})
      }else{
        if(e)
        {
          const {left, top} = e.currentTarget.getBoundingClientRect();
          this.setState({
            cordBtnLeft: left,
            cordBtnTop: top,
            listIsOpened: true})
          }
        }
        
    }

    onClickListElement(val?: typeComboValue): void
    {
      this.onClickChoiceHandle(undefined);
      if(typeof this.props.onChange == 'function')
      {
        this.props.onChange(val)
      }
    }

    runClose(e: Event): void
    {
      window.document.body.removeEventListener("mousewheel", this.runClose);
      window.document.body.removeEventListener("mousedown", this.runClose);
      if(e.target && this.refTable.current && this.refTable.current.contains(e.target as Element) == false)
      {
        this.setState({listIsOpened: false})
      }
    }

    findValByRawVal(rawVal: string | boolean | number): typeComboValue | undefined
    {
      if(ST.isUndefined(this.props.items))
      {
        return undefined;
      }
      
      const val = this.props.items.filter((item: typeComboValue) =>{
        return item['raw'] == rawVal;
      });
      
      return val[0];
    }


    render(): React.ReactElement
    {
      let {items} = this.props;
      
      const {val, listWidthPix} = this.props;

      if(ST.isUndefined(items))
      {
        items = [];
      }

      let realVal: typeComboValue= {
        raw: undefined,
        display: ''
      };
      
      if(val && val.raw)
      {
          const temp = this.findValByRawVal(val.raw);
          if(temp != undefined)
          {
            realVal = temp;
          }
      }

      const handler = {
        change: this.onClickListElement
      }

      const fieldLayout = <FieldLayoutEdit 
                          clearBtnFlag = {this.props['clearBtnFlag']}
                          prepareGridDisplay = { this.props.prepareGridDisplay }  
                          inputVal = {  String(realVal['display']) } 
                          //onChange = { this.props['onChange'] }
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

        let w = 0
        if(listWidthPix != undefined)
        {
          w = listWidthPix;
        }

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
                <ListLayout cordBtnLeft={this.state.cordBtnLeft} listWidthPix={w} cordBtnTop={this.state.cordBtnTop} disableSearch={this.props.disableSearch}  selectedVal = {realVal['raw'] } handler={handler}  items={items} />
              </td>
            </tr>
          </tbody>  
        </table>
        )
      }

      return (fieldLayout)
    }          
}