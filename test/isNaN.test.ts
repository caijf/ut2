import { isNaN } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isNaN', () => {
  it('corrent', () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(new Number(NaN))).toBe(true);
    expect(isNaN(Object(NaN))).toBe(true);
  });

  it('incorrent', () => {
    const expected = falsy.map((item) => item !== item);
    const actual = falsy.map(isNaN);

    expect(isNaN(undefined)).toBe(false);
    expect(expected).toEqual(actual);

    expect(isNaN(args)).toBe(false);
    expect(isNaN([1, 2, 3])).toBe(false);
    expect(isNaN(true)).toBe(false);
    expect(isNaN(new Date())).toBe(false);
    expect(isNaN(new Error())).toBe(false);
    expect(isNaN({ a: 1, b: 2 })).toBe(false);
    expect(isNaN(1)).toBe(false);
    expect(isNaN('a')).toBe(false);
    expect(isNaN(/x/)).toBe(false);
    expect(isNaN(symbol)).toBe(false);
  });
});
