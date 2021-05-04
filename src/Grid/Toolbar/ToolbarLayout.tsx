import React from 'react';
import { LinearGroupLayout } from '../../StringFld/LinearGroupLayout';
import { IImgButtonLayoutProps } from './../../StringFld/ImgButtonLayout'


export interface IToolbarItem {
  name: string;
  widthPix: number;
  type: {
    constr: React.ComponentType<IImgButtonLayoutProps>;
    settings: IImgButtonLayoutProps
  }
}

export interface IToolbarLayoutProps {
  items: IToolbarItem[]
}



// group of image buttons and other elements
export class ToolbarLayout extends React.Component<IToolbarLayoutProps>{


  constructor(props: IToolbarLayoutProps) {
    super(props);
  }

  render(): React.ReactElement {
    const nItems = [];
    for (let i = 0; i < this.props['items'].length; i++) {
      const Constr = this.props.items[i].type.constr;
      const settings = this.props.items[i].type.settings;
      const { name, widthPix } = this.props['items'][i]
      nItems.push(<Constr
        key={name}
        widthPix={widthPix ? widthPix : 32}
        {...settings}
      />);
    }


    return (
      <LinearGroupLayout height={32} prepareGridDisplay={true}  >
        {nItems}
      </LinearGroupLayout>
    )
  }
}

