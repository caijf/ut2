import { isWindow } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isWindow', () => {
  it('basic', () => {
    expect(isWindow({})).toBe(false);
    expect(isWindow(globalThis)).toBe(false);

    falsy.forEach((item) => {
      expect(isWindow(item)).toBe(false);
    });

    expect(isWindow(new Set())).toBe(false);
    expect(
      isWindow({
        constructor: function () {
          return false;
        }
      })
    ).toBe(false);
    expect(
      isWindow({
        constructor: function () {
          return true;
        }
      })
    ).toBe(false);
    expect(isWindow(args)).toBe(false);
    expect(isWindow([1, 2, 3])).toBe(false);
    expect(isWindow(true)).toBe(false);
    expect(isWindow(new Date())).toBe(false);
    expect(isWindow(new Error())).toBe(false);
    expect(isWindow({ a: 1, b: 2 })).toBe(false);
    expect(isWindow({ constructor: false })).toBe(false);
    expect(isWindow('abc')).toBe(false);
    expect(isWindow(1)).toBe(false);
    expect(isWindow(/x/)).toBe(false);
    expect(isWindow(symbol)).toBe(false);
  });
});
