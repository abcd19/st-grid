import React from 'react';
import './assets/InputLinear.scss'


export type onChangeType = (val: string | undefined) => void;

export interface IInputLayoutProps {
  onChangeDelay?: onChangeType;
  onChange?: onChangeType;
  val?: string;
  readOnly?: boolean;
  placeholder?: string;
}

// line input
export class InputLayout extends React.Component<IInputLayoutProps> {

  static defaultProps: IInputLayoutProps = {
    readOnly: false,
    onChange: ( /* val: string */) => { /* do nothing */ },
    onChangeDelay: ( /* val: string */) => { /* do nothing */ }, 
    placeholder: '',
    val: '',
  }

  private onChangeDelayTimer: number | undefined;


  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IInputLayoutProps)
  {
    super(props);
    this.onChangeDelayTimer = undefined;
    this.onChange = this.onChange.bind(this);
    this.inputRef = React.createRef();
    this.onChangeDelayTimerFunc = this.onChangeDelayTimerFunc.bind(this);
  }

  onChangeDelayTimerFunc(): void
  {
    if(this.inputRef.current != null)
    {
      const onChangeDelay: onChangeType = (this.props.onChangeDelay as onChangeType);
      onChangeDelay.apply(this, [this?.inputRef?.current?.value]);
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  {    

    if(typeof this.props['onChangeDelay'] == 'function')
    {
        if(this.onChangeDelayTimer != undefined)
        {
          clearTimeout(this.onChangeDelayTimer);
        }
        this.onChangeDelayTimer = window.setTimeout(this.onChangeDelayTimerFunc, 500);
    }
   
    const onChange: onChangeType = (this.props['onChange'] as onChangeType);
    onChange.apply(this, [event.target.value]);
  }

  render(): React.ReactElement  {

    const {val, readOnly, placeholder} = this.props;
    
    const _baseStyle: React.CSSProperties = {
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      fontKerning: 'auto',
      fontFamily: '"Tahoma", Helvetica, Arial, sans-serif',
      fontSize: '10pt'
    }

    return (
        <input 
          type = "text" 
          ref = {this.inputRef}
          value = {val}
          style={_baseStyle}
					readOnly = {readOnly}
					onChange = { this.onChange }
          className = "st-core-input-input" 
          placeholder = {placeholder} />
      );
  }
}