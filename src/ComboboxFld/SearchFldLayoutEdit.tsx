
import React from 'react';
import {FieldLayoutEdit} from '../StringFld/FieldLayoutEdit'
import * as ST from '../common'


export interface ISearchFldLayoutEditProps {
  onSearchBtnClick?: any;
  onChangeDelay: any;
  val?: any;
}

export interface ISearchFldLayoutEditState  {
  val: any;
}


export class SearchFldLayoutEdit extends React.Component<ISearchFldLayoutEditProps, ISearchFldLayoutEditState> {
    
  private buttons: {items : any[]};

    constructor(props: ISearchFldLayoutEditProps)
    {
      super(props);
      this.state = {
        val: undefined,
      };
      
      const self = this;
      this.buttons = {
        items: []
      };
      this.buttons['items'].push({
            imageName: 'search',
            name: 'search',
            settings: { 
              imageName: 'search',
              handler:{
                click: () =>{
                  if(ST.isFunction(this.props.onSearchBtnClick))
                  {
                    this.props.onSearchBtnClick(this.state.val);
                  }
                }
          },

        }
      });

      this.onChange = this.onChange.bind(this);
    }

    onChange(newVal: any): void
    {
      this.setState({
        val: newVal
      })
    }

    render()
    {
      
      const {val} = this.props;
      return(<FieldLayoutEdit inputVal = {this.state.val} onChange = {this.onChange} onChangeDelay = {this.props['onChangeDelay']} prepareGridDisplay = { false } buttons ={ this.buttons } />)
    }
}