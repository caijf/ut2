import { isWeakMap } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isWeakMap', () => {
  it('corrent', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isWeakMap(item)).toBe(false);
    });

    expect(isWeakMap(new Map())).toBe(false);
    expect(
      isWeakMap({
        constructor: function () {
          return false;
        }
      })
    ).toBe(false);
    expect(
      isWeakMap({
        constructor: function () {
          return true;
        }
      })
    ).toBe(false);
    expect(isWeakMap(args)).toBe(false);
    expect(isWeakMap([1, 2, 3])).toBe(false);
    expect(isWeakMap(true)).toBe(false);
    expect(isWeakMap(new Date())).toBe(false);
    expect(isWeakMap(new Error())).toBe(false);
    expect(isWeakMap({ a: 1, b: 2 })).toBe(false);
    expect(isWeakMap({ constructor: false })).toBe(false);
    expect(isWeakMap('abc')).toBe(false);
    expect(isWeakMap(1)).toBe(false);
    expect(isWeakMap(/x/)).toBe(false);
    expect(isWeakMap(symbol)).toBe(false);
  });
});
