
import * as ST from '../common'
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/LinearGroupLayout.css'

/**
 * Линейная группа элементов
 */
class LinearGroupLayout extends React.Component {

  constructor(props)
  {
    super(props);
    this.props = props;    
  }
  
  render() {
    var items = [];
    
    for (let i = 0; i < this.props.children.length; i++) 
    {
      let styleTd = {
        padding: '0px',
        margin: '0px'
      };
      
      if(ST.isUndefined(this.props.children[i].props['widthPix']) == false)
      {
        styleTd['width'] = this.props.children[i].props['widthPix']+'px';
      }

      var newItem = <td style={styleTd} key={ i }>
                        {this.props.children[i]}
                     </td>;
      items.push(newItem);
    }
    //пружинка, которая съедает оставшееся растояние
    let freeTd = <td key="freeSpaceSpring" style={{padding: '0px', margin: '0px'}}></td>
    items.push(freeTd);

    var style ={
      padding: '0px',
      margin: '0px',
      borderSpacing: '0px'
    };

    if(this.props.prepareGridDisplay === true)
    {
      var style ={
        border: 'none'
      };
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





function createLinearGroupLayout(wrapper, props)
{
  ReactDOM.render(<LinearGroupLayout items={props.items} />, wrapper);
}

export {LinearGroupLayout, createLinearGroupLayout}