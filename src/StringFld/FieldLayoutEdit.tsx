import * as ST from '../common'
import React from 'react';
import {LinearGroupLayout} from "./LinearGroupLayout";
import {InputLayout, onChangeType} from "./InputLayout";
import {ImgButtonLayout, IImgButtonLayoutProps} from "./ImgButtonLayout";


export interface IFieldLayoutEditProps {
  readOnly?: boolean;
  inputReadOnly?: boolean;
  inputVal?: string;
  onChange?: onChangeType;
  onChangeDelay?: onChangeType;
  buttons?: {
    items: Array<{
      name: string,
      settings: IImgButtonLayoutProps
    }>
  },
  clearBtnFlag?: boolean;
  prepareGridDisplay?: boolean;
}

// input & buttons
export const FieldLayoutEdit: React.FC<IFieldLayoutEditProps> = (props: IFieldLayoutEditProps) => {
  
    const items = [
        <InputLayout   readOnly= {props.readOnly || props.inputReadOnly} val ={props['inputVal']} key="input" onChange = {
            function(val: string | undefined){  
              if(typeof props['onChange'] == 'function')
              {
                props['onChange'](val)
              }
            }
        }  
        onChangeDelay = {
            function(val: string | undefined){  
              
              if(typeof props['onChangeDelay'] == 'function')
              {
                props['onChangeDelay'](val)
              }
            }
        }  
        />
      ];

    const {buttons} = props;
    
    
    if(typeof buttons == 'object' && ST.isArray(buttons['items']))
    {
        
      // buttons
      for(let i = 0; i < buttons['items'].length; i++)
      {
        const {settings, name} = buttons.items[i];
        
        items.push(<ImgButtonLayout 
                title = {settings.title} 
                imageName = {settings.imageName} 
                handler = {settings.handler} 
                key={name}  
                widthPix = {24}
                readOnly = {settings.readOnly}
                
          />);
      }
    }

    //last is clear button
    if(props['clearBtnFlag'])
    {

      items.push(<ImgButtonLayout 
            handler = {{
              click: function(/*e: React.MouseEvent<HTMLDivElement>*/){
                if(typeof props['onChange'] == 'function')
                {
                  props['onChange']('')
                }
              }
            }}
            title='Очистить'
            readOnly= {props.readOnly}
            key='clearCellGray'
            imageName = 'clearCellGray'
            widthPix = {24}
        />
      );
    } 
    
    return(
      <LinearGroupLayout prepareGridDisplay = { props.prepareGridDisplay }>
        {items}
      </LinearGroupLayout>
    );

}