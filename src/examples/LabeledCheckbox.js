
import {Checkbox} from '@abcd19/st-grid/'
import '@abcd19/st-grid/dist/index.css'
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Чекбокс с лейблом
 */
export class LabeledCheckbox
{
  constructor(data)
  {
    this.wrapper = document.getElementById(data['wrapperId']);
    this._val = false;
    this._label = typeof(data['label']) == 'string' ? data['label']: undefined;
    this.onChange = this.onChange.bind(this);
  }

  onChange(val)
  {
    this._val = val;
    this.commit();
  }

  setVale(val)
  {
    this._val =val; 
  }

  getVal()
  {
    return this._val;
  }

  commit()
  {
    ReactDOM.render(
      <table>
        <tbody>
          <tr>
            <td><Checkbox onChange={this.onChange} val = {this._val} /></td>
            <td className="directory-item-field-label" style={{paddingLeft: '5px', paddingTop: '5px'}}> {this._label}</td>
          </tr>
        </tbody>
      </table>, 
    this.wrapper);
  }

}


