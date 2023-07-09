import { isRegExp } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isRegExp', () => {
  it('correct', () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp('abc'))).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isRegExp(item)).toBe(false);
    });

    expect(isRegExp(args)).toBe(false);
    expect(isRegExp([1, 2, 3])).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(new Error())).toBe(false);
    expect(isRegExp({ a: 1, b: 2 })).toBe(false);
    expect(isRegExp('a')).toBe(false);
    expect(isRegExp(1)).toBe(false);
    expect(isRegExp(symbol)).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp('/abc/')).toBe(false);
  });
});
