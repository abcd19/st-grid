import * as ST from '../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {LinearGroupLayout} from "./LinearGroupLayout";
import {InputLayout} from "./InputLayout";
import {ImgButtonLayout} from "./ImgButtonLayout";

/**
 * Инпут с произвольным набором кнопок. Кнопка очисить включается отдельно по флагу
 */
export const FieldLayoutEdit = (props) => {
  
  
    //Массив с потомками. Первый идет инпут.
    let items = [
        <InputLayout name='input' readOnly= {props.readOnly} val ={props['inputVal']} key="input" onChange = {
            function(val){  
              if(ST.isFunction(props['onChange']))
              {
                props['onChange'](val)
              }
            }
        }  
        onChangeDelay = {
            function(val){  
              
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
                imageName = {buttons['items'][i]['settings']['imageName']} 
                handler = {buttons['items'][i]['settings']['handler']} 
                key={buttons['items'][i]['name']} 
                widthPix="24" 
                size = "24"
                readOnly = {buttons['items'][i]['settings']['readOnly']}
                name={buttons['items'][i]['name']} 
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
            readOnly= {props.readOnly}
            key='clearCellGray'
            imageName = 'clearCellGray'
            widthPix="24" 
            size = "24"
            name = 'clearCellGray'
        />
      );
    }; 
    
    return(
      <LinearGroupLayout prepareGridDisplay = { props.prepareGridDisplay }>
        {items}
      </LinearGroupLayout>
    );

}