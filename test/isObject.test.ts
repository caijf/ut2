import { isObject } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isObject', () => {
  it('corrent', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(noop)).toBe(true);
    expect(isObject(args)).toBe(true);
    expect(isObject(Object(false))).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Error())).toBe(true);
    expect(isObject(Object(0))).toBe(true);
    expect(isObject(Object(''))).toBe(true);
    expect(isObject(/x/)).toBe(true);
    expect(isObject(new Object())).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
    expect(isObject(Object(symbol))).toBe(true);
  });

  it('incorrent', () => {
    const values = [...falsy, true, 1, 'a', symbol];
    values.forEach((item) => {
      expect(isObject(item)).toBe(false);
    });
  });
});
