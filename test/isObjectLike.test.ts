import { isObjectLike } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isObjectLike', () => {
  it('correct', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([1, 2, 3])).toBe(true);
    expect(isObjectLike(args)).toBe(true);
    expect(isObjectLike(Object(false))).toBe(true);
    expect(isObjectLike(new Date())).toBe(true);
    expect(isObjectLike(new Error())).toBe(true);
    expect(isObjectLike(Object(0))).toBe(true);
    expect(isObjectLike(Object(''))).toBe(true);
    expect(isObjectLike(/x/)).toBe(true);
    expect(isObjectLike(new Object())).toBe(true);
    expect(isObjectLike(Object.create(null))).toBe(true);
    expect(isObjectLike(Object(symbol))).toBe(true);
  });

  it('incorrect', () => {
    const values = [...falsy, true, 1, 'a', symbol, noop];
    values.forEach((item) => {
      expect(isObjectLike(item)).toBe(false);
    });
  });
});
