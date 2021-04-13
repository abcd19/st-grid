
import React, {useEffect, useState, useRef} from 'react';

/**
 * Элемент списка
 */
export const ListItemLayout = (props) =>
{
  let [mouseOver, setMouseOver] = useState(false);

  let div = useRef(null);

  useEffect(()=>{
    if(props.setScroll == true)
    {
      div.current.scrollIntoView({ behavior: 'auto', block: "center" })
    }
  });

  let style ={
    borderTop: '1px lightgray solid',
    minHeight: '18px',
    //wordWrap: 'break-word',
    whiteSpace: 'normal',
    lineHeight: 'normal',
    fontKerning: 'auto',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '12px',
    width: props.itemsListWidthPix,
    //overflow: 'hidden',
    //textOverflow: 'ellipsis',
    paddingTop: '2px',
    paddingBottom: '2px',
    boxSizing: 'content-box',
  }

  if(mouseOver == true)
  {
    style.background = '#FEFFBF'
  }else{

    if(props.isSelected == true)
    {
      style.background = '#EDF5FC';
    }else{
      style.background = 'white';
    }
    
  }

  let onClick = (e) =>
  {
    props.onClick(props.val);
    e.stopPropagation();
  }

  return(
    <div 
      title = { props.val.display }
      ref= {div}
      style={style} 
      onClick={ onClick } 
      onMouseDown={(e) => e.stopPropagation()} 
      onMouseUp = {(e) => e.stopPropagation()}
      onMouseOver={ () => setMouseOver(true) } 
      onMouseOut={ () => setMouseOver(false) }> { props.val.display }</div>
  );
  
}