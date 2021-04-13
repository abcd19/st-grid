let valTypes = [{
  alias: 'string',
  name: 'Строка',
  type: {
    constrEdit: StringFld,
    constrView: StringFldCell,
    settings: {
      clearBtnFlag: true
    }
  }},
  {
  alias: 'date',
  name: 'Дата',
  type: {
    constrEdit: DateFld,
    constrView: DateFldCell,
    settings: {
      clearBtnFlag: true
    }
  }},
  {
    alias: 'check',
    name: 'Флаг',
    type: {
      constrEdit: Checkbox,
      constrView: CheckboxFldCell
    }
}];

export columns = [
  {
    title: 'Наименование',
    alias: 'name',
    widthPix: 200        
  },   
  {
    title: 'Тип данных',
    alias: 'type',
    widthPix: 200,
    type: {
      constr: ComboboxFldCell,
      settings:{
        items: props.paramsTypeList
      }
    },   
  }, 
  {
    title: 'Массив',
    alias: 'arrayFlag',
    widthPix: 200,
    type: {
      constr: CheckboxFldCell,
      settings:{}
    },
  },
  {
    title: 'Обязательный',
    alias: 'mandatoryFlag',
    widthPix: 200,
    type: {
      constr: CheckboxFldCell,
      settings:{}
    },
  },
  {
    title: 'Значение по умолчанию',
    alias: 'value',
    widthPix: 200,
    type: {
      constr: ComplexFldCell,
      settings:{
        showTypeCombobox: false,
        items:  valTypes,
        val: {type: 'check', val: true}
      }
    },
  },
];