
import {HeaderRowLayout} from './HeaderRowLayout';
import ReactDOM from 'react-dom';
import React from 'react';
/**
 * Заголовок у грида
 */
class HeaderLayout extends React.Component {
      
  /**
   * @constructor
   * @param {type} data
   */
  constructor(props)
  {
    super(props);
    this.props = props;
  };
  
  render()
  {  
    let handler= {
      changeHeaderCellWidth: this.props.onChangeHeaderCellWidth,
      clickHeaderCell: function(alias){},
   };

   let columns = this.props['columns'];

    return(
      <table cellPadding="0" cellSpacing="0" className="st-innerTableLayout-table" style={{borderCollapse: "collapse"}}>
        <tbody>
          <HeaderRowLayout handler ={handler} columns={columns} />
        </tbody>
      </table>
    )
  };

};


export {HeaderLayout};


