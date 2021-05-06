//общие функции
import {isUndefined, isString, isBoolean, isFunction, isArray, isEqual, isObject, isNumber, defaults, has, clone} from '../common'

describe('isUndefined', () => {
 
  it('isUndefined(undefined)', () => {
    expect(isUndefined(undefined)).toBe(true);
  })

  it('isUndefined({})', () => {
    expect(isUndefined({})).toBe(false);
  })

  it('isUndefined({a:1})', () => {
    expect(isUndefined({a:1})).toBe(false);
  })

  it('isUndefined(null)', () => {
    expect(isUndefined(null)).toBe(false);
  })

  it('isUndefined("")', () => {
    expect(isUndefined('')).toBe(false);
  })

  it('isUndefined(0)', () => {
    expect(isUndefined(0)).toBe(false);
  })

  it('isString()', () => {
    expect(isString('blabla')).toBe(true);
  })

  it('isBoolean()', () => {
    expect(isBoolean(true)).toBe(true);
  })
  
  it('isFunction()', () => {
    expect(isFunction(function(){})).toBe(true);
  })

  it('isArray()', () => {
    expect(isArray([])).toBe(true);
  })

  it('isEqual', ()=>{
    expect(isEqual({a:1},{a:1})).toBe(true);
  })

  it('isObject', ()=>{
    expect(isObject({a:1})).toBe(true);
  })

  it('isNumber', ()=>{
    expect(isNumber(123)).toBe(true);
  })

  it('clone', ()=>{
    expect(clone({a:1})).toStrictEqual({a:1});
  })

  it('has', ()=>{
    expect(has('a', {a: 1})).toBe(false);
  })

  it('defaults', ()=>{
    expect(defaults({},{a:1})).toStrictEqual({a:1});
  })
})
