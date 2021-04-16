import React from 'react';
import './Checkbox.scss';


type onChangeType = (val: boolean) => void;

export interface ICheckboxFldLayoutEditProps {
  onChange?: onChangeType;
  readOnly?: boolean;
  val?: boolean | undefined;
}

// checkbox layout component
export class CheckboxFldLayoutEdit extends React.Component<ICheckboxFldLayoutEditProps>{
    
  static defaultProps: ICheckboxFldLayoutEditProps = {
    readOnly: false,
    onChange: ( /* val: boolean */) => { /* do nothing */ },
    val: false
  }

    private _val: boolean;

    /**
    * @constructor
    * @param {type} data
    */
    constructor(props: ICheckboxFldLayoutEditProps)
    {
      super(props);
      this.onClickHandle = this.onClickHandle.bind(this);
      this._val = false;
    }
      
    onClickHandle(/* e: React.MouseEvent<HTMLDivElement> */): void
    {      
      if(this._val == true)
      {
        this._val = false;
      }else{
        this._val = true;
      }
      
      const onChange: onChangeType = (this.props.onChange as onChangeType);
      if(this.props.readOnly === false)
      {
        onChange(this._val);
      }
      
    }

    render(): React.ReactNode
    {
      console.dir(this.props.onChange)
      
      const style ={
        backgroundPosition: '30px 15px',
        opacity: ''
      };
      
      if(this.props.readOnly === true)
      {
        style.opacity = '0.5';
      }else{
        style.opacity = '1';
      }

      switch (this.props.val)
      {
        case true:
          this._val = true;
          style.backgroundPosition = '0px 15px';
          break;
        default:
          this._val = false;
          style.backgroundPosition = '30px 15px';
          break;
      }
      return (<div className="pr-checkbox-imgCont" onClick = {this.onClickHandle} style={style}></div>);
    }


}