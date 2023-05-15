import { isArray } from '../../src';
import { falsy, noop, symbol, args } from '../_utils';

describe('isArray', () => {
  it('corrent', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(new Array(2))).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isArray(item)).toBe(false);
    });

    expect(isArray(args)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray({ '0': 1, length: 1 })).toBe(false);

    expect(isArray({ a: 1, b: 2 })).toBe(false);
    expect(isArray(noop)).toBe(false);
    expect(isArray(/x/)).toBe(false);
    expect(isArray('a')).toBe(false);
    expect(isArray(new Error())).toBe(false);
    expect(isArray(symbol)).toBe(false);
  });
});
