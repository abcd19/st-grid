import {ComboboxFldCell, CheckboxFldCell, StringFldLayoutEdit, DateFldLayoutEdit, CheckboxFldLayoutEdit, StringFldCell, DateFldCell} from './../../stgrid'
import {ComplexFldCell} from './../ComplexFld/ComplexFldCell'
import {onAddItem,onMouseDownItem,onChangeItem} from './handlers'
import React, { useState } from 'react'


export class ParamsTbl extends React.Component
{
  constructor(props)
  {
    super(props);
    
    let valTypes = [{
      alias: 'string',
      name: 'Строка',
      type: {
        constrEdit: StringFldLayoutEdit,
        constrView: StringFldCell,
        settings: {
          clearBtnFlag: true
        }
      }},
      {
      alias: 'date',
      name: 'Дата',
      type: {
        constrEdit: DateFldLayoutEdit,
        constrView: DateFldCell,
        settings: {
          clearBtnFlag: true
        }
      }},
      {
        alias: 'check',
        name: 'Флаг',
        type: {
          constrEdit: CheckboxFldLayoutEdit,
          constrView: CheckboxFldCell
        }
    }];

    let columns = [
      {
        title: 'Наименование',
        alias: 'name',
        widthPix: 200        
      },   
      {
        title: 'Тип данных',
        alias: 'type',
        widthPix: 200,
        type: {
          constr: ComboboxFldCell,
          settings:{
            items: props.paramsTypeList
          }
        },   
      }, 
      {
        title: 'Массив',
        alias: 'arrayFlag',
        widthPix: 200,
        type: {
          constr: CheckboxFldCell,
          settings:{}
        },
      },
      {
        title: 'Обязательный',
        alias: 'mandatoryFlag',
        widthPix: 200,
        type: {
          constr: CheckboxFldCell,
          settings:{}
        },
      },
      {
        title: 'Значение по умолчанию',
        alias: 'value',
        widthPix: 200,
        type: {
          constr: ComplexFldCell,
          settings:{
            showTypeCombobox: false,
            items:  valTypes,
            val: {type: 'check', val: true}
          }
        },
      },
    ];

    this.onAddItem = onAddItem.bind(this);
    this.onMouseDownItem = onMouseDownItem.bind(this);
    this.onChangeItem = onChangeItem.bind(this);

         
    this.state = {
      columns: columns,
      items: props.items,
      selItemNum: undefined
    };
  }


  render() {
    return <Table
      selItemNum = {this.state.selItemNum}
      onAddItem = {this.onAddItem}
      onMouseDownItem = {this.onMouseDownItem}
      onChangeItem = {this.onChangeItem}
      items = {this.state.items}
      columns={this.state.columns}
      width={1300} 
      />
  };

}
