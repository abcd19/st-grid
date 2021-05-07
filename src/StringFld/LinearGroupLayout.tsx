
import * as ST from '../common'
import React from 'react';
import './assets/LinearGroupLayout.scss'
import {IInputLayoutProps} from './InputLayout';
import {IImgButtonLayoutProps} from './ImgButtonLayout';


export interface ILinearGroupLayoutProps {
  children:  Array<React.ReactElement<IImgButtonLayoutProps | IInputLayoutProps>>;
  height?: number;
  prepareGridDisplay?: boolean;
}

// linear group of different elements (e.g. inputs, image buttons)
export class LinearGroupLayout extends React.Component<ILinearGroupLayoutProps> {

  constructor(props: ILinearGroupLayoutProps)
  {
    super(props);  
  }
  
  render(): React.ReactElement {
    const items = [];
    
    for (let i = 0; i < this.props.children.length; i++) 
    {
      const styleTd: React.CSSProperties = {
        padding: '0px',
        margin: '0px'
      };
      
      if(ST.isNumber(this.props.height))
      {
        styleTd.height = this.props.height + 'px';
      }

      if(ST.isUndefined(this.props.children[i].props['widthPix']) == false)
      {
        styleTd['width'] = this.props.children[i].props['widthPix'] + 'px';
      }

      const newItem = <td align="center"  style={styleTd} key={ i } >
                        {this.props.children[i]}
                     </td>;
      items.push(newItem);
    }
    
    const freeTd = <td key="freeSpaceSpring" style={{padding: '0px', margin: '0px'}}></td>
    items.push(freeTd);

    const style: React.CSSProperties ={
      padding: '0px',
      margin: '0px',
      borderSpacing: '0px'
    };


    if(this.props.prepareGridDisplay === true)
    {
      style['border']  = 'none';
    }

    //если только пружинка, других элементов нет
    if(items.length == 1)
    {
      style['height'] = '0px';
    }

    return (
        <table className = "st-field-table-project st-linear-table" style={style}>
          <tbody>
          <tr>
            { items }
          </tr>
          </tbody>
        </table>
      );
  }
}