import { isArrayLikeObject } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isArrayLikeObject', () => {
  it('corrent', () => {
    const values = [args, [1, 2, 3], { '0': 'a', length: 1 }];
    values.forEach((item) => {
      expect(isArrayLikeObject(item)).toBe(true);
    });
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isArrayLikeObject(item)).toBe(false);
    });

    expect(isArrayLikeObject('abc')).toBe(false);
    expect(isArrayLikeObject(true)).toBe(false);
    expect(isArrayLikeObject(new Date())).toBe(false);
    expect(isArrayLikeObject(1)).toBe(false);
    expect(isArrayLikeObject({ a: 1, b: 2 })).toBe(false);
    expect(isArrayLikeObject(noop)).toBe(false);
    expect(isArrayLikeObject(/x/)).toBe(false);
    expect(isArrayLikeObject(new Error())).toBe(false);
    expect(isArrayLikeObject(symbol)).toBe(false);
  });
});
