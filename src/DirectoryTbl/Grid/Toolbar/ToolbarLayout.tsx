import React from 'react';
import { LinearGroupLayout } from '../../../StringFld/LinearGroupLayout';
import { IImgButtonLayoutProps } from './../../../StringFld/ImgButtonLayout'


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
export const ToolbarLayout: React.FC<IToolbarLayoutProps> = ({ items }: IToolbarLayoutProps) => {
  return (
    <LinearGroupLayout height={32} prepareGridDisplay={true}  >
      {
        items.map((item) => {
          const Constr = item.type.constr;
          const settings = item.type.settings;
          const { name } = item;
          return <Constr key={name} widthPix={32} {...settings} />
        })
      }
    </LinearGroupLayout>
  )
}

