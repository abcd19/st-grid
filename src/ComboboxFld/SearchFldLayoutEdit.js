
import React from 'react';
import {FieldLayoutEdit} from '../StringFld/FieldLayoutEdit'
import * as ST from '../common'

export class SearchFldLayoutEdit extends React.Component {
    
    constructor(props)
    {
      super(props);
      this.props = props;
      this.state = {
        val: undefined,
      };
      
      var self = this;
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

    onChange(newVal)
    {
      this.setState({
        val: newVal
      })
    }

    render()
    {
      
      let {val} = this.props;
      return(<FieldLayoutEdit inputVal = {this.state.val} onChange = {this.onChange} onChangeDelay = {this.props['onChangeDelay']} prepareGridDisplay = { this.props.prepareGridDisplay } buttons ={ this.buttons } />)
    }
};