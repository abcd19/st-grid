//общие функции

import lodash_has from 'lodash/has';
import lodash_cloneDeep from 'lodash/cloneDeep';
import lodash_isObject from 'lodash/isObject';
import lodash_isFunction from 'lodash/isFunction';
import lodash_isUndefined from 'lodash/isUndefined';
import lodash_isNumber from 'lodash/isNumber';
import lodash_defaults from 'lodash/defaults';
import lodash_isArray from 'lodash/isArray';


export function isArray(obj)
{
  return lodash_isArray(obj)
}

/**
 * @param {*} obj 
 */
export function isUndefined(obj)
{
  return lodash_isUndefined(obj)
}

export function isObject(obj)
{
  return lodash_isObject(obj)
}

export function isFunction(obj)
{
  return lodash_isFunction(obj);
}

export function isNumber(obj)
{
  return lodash_isNumber(obj);
}

/*
* Заполнение пустых атрибутов объекта значениями из values
*/
export function defaults(obj,values)
{
  return lodash_defaults(obj,values)
}

/**
 * Проверка наличия подмассива в объекте
 * Путь задается через точкой строкой вида 'handler.onChnage'
 */
export function has(obj, strPath)
{
  return lodash_has(obj, strPath)
}

/**
 * Рекурсивное клонирование объекта
 * @param {*} obj 
 */
export function clone(obj)
{
  return lodash_cloneDeep(obj);
}
