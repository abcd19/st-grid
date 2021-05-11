import { shallow } from 'enzyme';
import { DirectoryTbl, IDirectoryTblProps } from './../DirectoryTbl';
import { typeColumn } from '../../Grid/GridLayout';
import { ComboboxFldCell } from './../../ComboboxFld/ComboboxFldCell';
import { CheckboxFldCell } from './../../CheckboxFld/CheckboxFldCell';
import React from 'react';

const list = [
  { raw: "newcomer", display: "newcomer" },
  { raw: "intermediate", display: "intermediate" },
  { raw: "advanced", display: "advanced user" }
];

export const items = [
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

export const columns: typeColumn[] = [
  {
    title: "№",
    alias: "num",
    visible: false
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
