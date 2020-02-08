
import React from 'react';
import ReactDOM from 'react-dom';
import {FieldLayoutEdit} from './../StringFld/FieldLayoutEdit'

class SearchFldLayout extends React.Component {
    
    constructor(props)
    {
      super(props);
      this.state = {};
      
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
                click: function(){}
          },

        }
      });

    }

    render(){
      return(<FieldLayoutEdit onChangeDelay = {this.props['onChangeDelay']} prepareGridDisplay = { this.props.prepareGridDisplay } buttons ={ this.buttons } />)
    }

    
};

export {SearchFldLayout}