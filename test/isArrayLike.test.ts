import { isArrayLike } from '../src';
import { args, falsy, noop, symbol } from './_utils';

describe('isArrayLike', () => {
  it('correct', () => {
    const values = [args, [1, 2, 3], { '0': 'a', length: 1 }, '', 'abc'];
    values.forEach((item) => {
      expect(isArrayLike(item)).toBe(true);
    });

    expect(isArrayLike(new Buffer(0))).toBe(true);
  });

  it('incorrect', () => {
    falsy
      .filter((item) => item !== '')
      .forEach((item) => {
        expect(isArrayLike(item)).toBe(false);
      });

    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(new Date())).toBe(false);
    expect(isArrayLike(1)).toBe(false);
    expect(isArrayLike({ a: 1, b: 2 })).toBe(false);
    expect(isArrayLike(noop)).toBe(false);
    expect(isArrayLike(/x/)).toBe(false);
    expect(isArrayLike(new Error())).toBe(false);
    expect(isArrayLike(symbol)).toBe(false);
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(isArrayLike((a, b) => {})).toBe(false);
  });
});
