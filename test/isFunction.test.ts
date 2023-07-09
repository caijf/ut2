import { isFunction } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isFunction', () => {
  it('correct', () => {
    expect(isFunction(noop)).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(new Function())).toBe(true);
    expect(isFunction(Object.prototype.constructor)).toBe(true);

    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function* () {})).toBe(true);
    expect(isFunction(Proxy)).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isFunction(item)).toBe(false);
    });

    expect(isFunction(args)).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction({ a: 1, b: 2 })).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new Error())).toBe(false);
    expect(isFunction(/x/)).toBe(false);
    expect(isFunction(symbol)).toBe(false);
  });
});
