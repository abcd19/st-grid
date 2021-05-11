
import React from 'react';
import {FieldLayoutEdit} from '../StringFld/FieldLayoutEdit';
import {onChangeType} from './../StringFld/InputLayout';
import {IImgFieldLayoutEditBtn} from './../StringFld/FieldLayoutEdit';

export interface ISearchFldLayoutEditProps {
  onSearchBtnClick: onChangeType;
  onChangeDelay?: onChangeType;
  val?: string;
}

export interface ISearchFldLayoutEditState  {
  val?: string;
}

export class SearchFldLayoutEdit extends React.Component<ISearchFldLayoutEditProps, ISearchFldLayoutEditState> {
    
    private buttons: IImgFieldLayoutEditBtn;

    constructor(props: ISearchFldLayoutEditProps)
    {
      super(props);
      this.state = {
        val: undefined,
      };
      
      this.buttons = {
        items: []
      };
      this.buttons['items'].push({
            name: 'search',
            settings: { 
              imageName: 'search',
              handler:{
                click: () => {
                    this.props.onSearchBtnClick(this.state.val);
                }
          },

        }
      });

      this.onChange = this.onChange.bind(this);
    }

    onChange(newVal?: string): void
    {
      this.setState({
        val: newVal
      })
    }

    render(): React.ReactElement
    {
      return(<FieldLayoutEdit inputVal = {this.state.val} onChange = {this.onChange} onChangeDelay = {this.props['onChangeDelay']} prepareGridDisplay = { false } buttons ={ this.buttons } />)
    }
}