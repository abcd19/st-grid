import * as ST from '../../common'
import React from 'react';
import ReactDOM from 'react-dom';
import {FieldLayoutEdit} from './../../stgrid';


export class UploadFldLayoutEdit extends  React.Component {


  constructor(props)
  {
    super(props);
    this.props = props;
    this.state = {};
    this.myRef = React.createRef();
    this.aRef = React.createRef();
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onClearBtnClick = this.onClearBtnClick.bind(this);

  }


  onSelectFile(e)
  {
    console.log(e.target.files.item(0));
    let fileReader = new FileReader();
    fileReader.onloadend = function(e)
    {
      console.dir(fileReader.result);
    }
    //fileReader.readAsArrayBuffer(e.target.files[0])
    fileReader.readAsArrayBuffer(e.target.files[0]);
    
    var tmppath = URL.createObjectURL(event.target.files[0]);
    if(ST.isFunction(this.props.onChange))
    {
      this.props.onChange(e.target.files, this.myRef.current.value)
    }
  }

  //клик по кнопке очистить
  onClearBtnClick(val)
  {
    if(isFunction(this.props.onChange))
    {
      this.props.onChange(undefined)
    }
  }

    
  render()
  {
  
  let {handler, val, clearBtnFlag, onChange, readOnly} = this.props ;
    
  if(ST.isUndefined(handler))
  {
    handler = {};
  }

  let buttons = {
    items: []
  };

  buttons['items'].push({
    name: 'chooseBtn',
    settings: { 
      title: 'Выбрать',
      handler:{
        click: ()=> { 
          //запускаем событие на input type="file"
          this.myRef.current.click()
        }
      },
      imageName: 'chooseCellGray'
    }
  });

  //кнопку загрузить пока скроем
  buttons['items'].push({
    name: 'downloadBtn',
    settings: { 
      title: 'Скачать',
      handler:{
        click: ()=> { 
          let file = val.item(0);
          let blob = new Blob([file]);
          let bjectURL = URL.createObjectURL(blob);
          this.aRef.current.href = bjectURL;
          this.aRef.current.download = file.name;
          this.aRef.current.click();
          URL.revokeObjectURL(this.aRef.current);
        }
      },
      imageName: 'download'
    }
  });

  let fileName = '';

  if(ST.isObject(val) && val.length > 0)
  {
    let file = val.item(0);
    fileName = file.name;
  }

  return(
    <div>
      <FieldLayoutEdit 
        prepareGridDisplay = { this.props.prepareGridDisplay } 
        clearBtnFlag = {clearBtnFlag}
        buttons ={ buttons } 
        inputVal = {fileName} 
        
        onChangeDelay = { handler['changeDelay'] }
       />
      <div><input ref={this.myRef} style={{display: 'none'}} type="file" onChange={this.onSelectFile} /></div>
      <div><a ref={this.aRef} style={{display: 'none'}} /></div>
    </div>

      
    );
  }	
}