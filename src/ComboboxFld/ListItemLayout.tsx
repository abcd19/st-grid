
import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';

export type typeVal = {
  raw?: string | number | boolean;
  display?: string | number | boolean;
};

export interface IListItemLayoutProps {
  setScroll?: boolean;
  itemsListWidthPix?: number;
  isSelected?: boolean;
  onClick?: (val: typeVal) => void;
  val?: typeVal;
}

// combobox list element
export const ListItemLayout: React.FC<IListItemLayoutProps> = (props: IListItemLayoutProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.setScroll == true) {
      if (div && div.current) {
        div.current.scrollIntoView({ behavior: 'auto', block: "center" })
      }
    }
  });

  const style: React.CSSProperties = {
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

  if (mouseOver == true) {
    style.background = '#FEFFBF'
  } else {

    if (props.isSelected == true) {
      style.background = '#EDF5FC';
    } else {
      style.background = 'white';
    }

  }

  const onClick = (e: SyntheticEvent<HTMLDivElement>) => {
    if (typeof props.onClick == 'function' && props.val != undefined) {
      6
      props.onClick(props.val);
    }

    e.stopPropagation();
  }

  let display = undefined;

  if(props.val && props.val.display)
  {
    display = String(props.val.display);
  }

  return (
    <div
      title={display}
      ref={div}
      style={style}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}> { display}</div>
  );

}