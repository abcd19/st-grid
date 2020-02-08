import {HeaderCellLayout} from './HeaderCellLayout'
import ReactDOM from 'react-dom';
import React from 'react';

/**
 * Строка заголовка грида
 */
class HeaderRowLayout extends React.Component {
  
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);
    this.props = props;
    this.state = {}
  };

  render(){
    let items = [];
    for(let i = 0; i < this.props['columns'].length; i++)
    {
      if(this.props['columns'][i]['visible'] === false)
      {
        continue
      }
      
      let newItem = <HeaderCellLayout 
                          key = {i} 
                          width = {this.props['columns'][i]['widthPix']}
                          handler={this.props['handler']}  
                          settings={this.props['columns'][i]} 
                          text={this.props['columns'][i]['title']} />;
                  
      items.push(newItem);
    }
    return(<tr>
            {items}
            <td  className='st-grid-head-cell-freeSpace'></td>
          </tr>)
  }
  
};

export {HeaderRowLayout}

