import { isString } from '../../src';
import { args, falsy, symbol } from '../_utils';

describe('isString', () => {
  it('corrent', () => {
    expect(isString('abc')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString(new String('abc'))).toBe(true);
    expect(isString(Object('abc'))).toBe(true);
  });

  it('incorrent', () => {
    falsy
      .filter((item) => item !== '')
      .forEach((item) => {
        expect(isString(item)).toBe(false);
      });

    expect(isString(args)).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(new Error())).toBe(false);
    expect(isString({ a: 1, b: 2 })).toBe(false);
    expect(isString({ constructor: false })).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(/x/)).toBe(false);
    expect(isString(symbol)).toBe(false);
  });
});
