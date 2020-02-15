//общие функции
import {isUndefined} from './../common'

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
 
})
