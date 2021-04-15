

import {DirectoryTbl, ImgButtonLayout, ComboboxFldCell, CheckboxFldCell} from '../stgrid'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


export class MyTable extends React.Component {
  constructor(props) {
    super(props);

    let list = [
      { raw: "newcomer", display: "newcomer" },
      { raw: "intermediate", display: "intermediate" },
      { raw: "advanced", display: "advanced user" }
    ];

    let items = [
      {
        data: {
          num: String(1),
          login: "Jane",
          userName: "Jane Smith",
          verified: false,
          level: list[0]
        }
      },

      {
        data: {
          num: String(3),
          login: "Steven",
          userName: "Steven Tyler",
          verified: true,
          level: list[2]
        }
      },

      {
        data: {
          num: String(2),
          login: "John",
          userName: "John Cash",
          verified: false,
          level: list[1]
        }
      }
    ];

    let columns = [
      {
        title: "№",
        alias: "num"
      },
      {
        title: "Login",
        alias: "login"
      },
      {
        title: "User name",
        alias: "userName"
      },
      {
        title: "Verified",
        alias: "verified",
        widthPix: 200,
        type: {
          constr: CheckboxFldCell,
          settings: {
            //readOnly: true
          }
        }
      },

      {
        title: "Level",
        alias: "level",
        widthPix: 200,
        type: {
          constr: ComboboxFldCell,
          settings: {
            items: list,
            listWidthPix: 200,
            clearBtnFlag: true,
          }
        }
      }
    ];

    this.onChange = this.onChange.bind(this);

    this.state = {
      items: items,
      columns: columns
    };
  }

  onChange(newItems, action) {
    console.dir(arguments);
    this.setState({ items: newItems });
  }

  onSelectItem(itemNum) {
    console.dir(arguments);
    console.log("onSelectItem");
  }

  render() {
    return (
      <>
        <DirectoryTbl
          width={900}
          height={400}
          addBtnFlag={true}
          onChange={this.onChange}
          items={this.state.items}
          onSelectItem={this.onSelectItem}
          removeBtnFlag={true}
          columns={this.state.columns}
        />
      </>
    );
  }
}






