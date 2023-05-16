import { isBoolean } from '../../src';
import { args, falsy, noop, symbol } from '../_utils';

describe('isBoolean', () => {
  it('检测布尔值，返回 true', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(Object(true))).toBe(true);
    expect(isBoolean(Object(false))).toBe(true);
  });

  it('非布尔值', () => {
    falsy.forEach((item) => {
      expect(isBoolean(item)).toBe(item === false);
    });

    expect(isBoolean(args)).toBe(false);
    expect(isBoolean(noop())).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Error())).toBe(false);
    expect(isBoolean({ a: 1, b: 2 })).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('a')).toBe(false);
    expect(isBoolean(/x/)).toBe(false);
    expect(isBoolean(symbol)).toBe(false);
  });
});
