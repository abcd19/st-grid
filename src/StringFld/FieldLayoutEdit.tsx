import * as ST from '../common'
import React from 'react';
import {LinearGroupLayout} from "./LinearGroupLayout";
import {InputLayout} from "./InputLayout";
import {ImgButtonLayout} from "./ImgButtonLayout";

export interface IFieldLayoutEditProps {
  readOnly?: boolean,
  inputReadOnly?: boolean,
  canUserSelectFlag?: boolean,
  inputVal?: string,
  onChange: any,
  onChangeDelay: any,
  buttons: {
    items: Array<any>
  },
  clearBtnFlag: boolean,
  prepareGridDisplay: boolean
}

/**
 * Инпут с произвольным набором кнопок. Кнопка очисить включается отдельно по флагу
 */
export const FieldLayoutEdit: React.FC<IFieldLayoutEditProps> = (props: IFieldLayoutEditProps) => {
  
  
    //Массив с потомками. Первый идет инпут.
    let items = [
        <InputLayout   readOnly= {props.readOnly || props.inputReadOnly} val ={props['inputVal']} key="input" onChange = {
            function(val:any){  
              if(ST.isFunction(props['onChange']))
              {
                props['onChange'](val)
              }
            }
        }  
        onChangeDelay = {
            function(val: any){  
              
              if(ST.isFunction(props['onChangeDelay']))
              {
                props['onChangeDelay'](val)
              }
            }
        }  
        />
      ];

    let {buttons} = props;
    
    
    if(ST.isObject(buttons) && ST.isArray(buttons['items']))
    {
        
      //Далее кнопки
      for(let i = 0; i < buttons['items'].length; i++)
      {
        items.push(<ImgButtonLayout 
                title = {buttons['items'][i]['settings']['title']} 
                imageName = {buttons['items'][i]['settings']['imageName']} 
                handler = {buttons['items'][i]['settings']['handler']} 
                key={buttons['items'][i]['name']}  
                size = {24}
                readOnly = {buttons['items'][i]['settings']['readOnly']}
                
          />);
      }
    }

    //последняя кнопка кнопка очистки
    if(props['clearBtnFlag'])
    {

      items.push(<ImgButtonLayout 
            handler = {{
              click: function(){
                if(ST.isFunction(props['onChange']))
                {
                  props['onChange']('')
                }
              }
            }}
            title='Очистить'
            readOnly= {props.readOnly}
            key='clearCellGray'
            imageName = 'clearCellGray'
            size = {24}
        />
      );
    }; 
    
    return(
      <LinearGroupLayout prepareGridDisplay = { props.prepareGridDisplay }>
        {items}
      </LinearGroupLayout>
    );

}