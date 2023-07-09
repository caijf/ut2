import { isNil } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isNil', () => {
  it('correct', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    // @ts-ignore
    expect(isNil()).toBe(true);
    expect(isNil(void 0)).toBe(true);
  });

  it('incorrect', () => {
    const expected = falsy.map((item) => item == null);
    const actual = falsy.map(isNil);

    expect(expected).toEqual(actual);

    expect(isNil(args)).toBe(false);
    expect(isNil([1, 2, 3])).toBe(false);
    expect(isNil(true)).toBe(false);
    expect(isNil(new Date())).toBe(false);
    expect(isNil(new Error())).toBe(false);
    expect(isNil({ a: 1, b: 2 })).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil('a')).toBe(false);
    expect(isNil(/x/)).toBe(false);
    expect(isNil(symbol)).toBe(false);
  });
});
