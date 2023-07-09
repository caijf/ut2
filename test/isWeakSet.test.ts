import { isWeakSet } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isWeakSet', () => {
  it('correct', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isWeakSet(item)).toBe(false);
    });

    expect(isWeakSet(new Set())).toBe(false);
    expect(
      isWeakSet({
        constructor: function () {
          return false;
        }
      })
    ).toBe(false);
    expect(
      isWeakSet({
        constructor: function () {
          return true;
        }
      })
    ).toBe(false);
    expect(isWeakSet(args)).toBe(false);
    expect(isWeakSet([1, 2, 3])).toBe(false);
    expect(isWeakSet(true)).toBe(false);
    expect(isWeakSet(new Date())).toBe(false);
    expect(isWeakSet(new Error())).toBe(false);
    expect(isWeakSet({ a: 1, b: 2 })).toBe(false);
    expect(isWeakSet({ constructor: false })).toBe(false);
    expect(isWeakSet('abc')).toBe(false);
    expect(isWeakSet(1)).toBe(false);
    expect(isWeakSet(/x/)).toBe(false);
    expect(isWeakSet(symbol)).toBe(false);
  });
});
