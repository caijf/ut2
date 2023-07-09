import { isNumber } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isNumber', () => {
  it('correct', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(new Number(1))).toBe(true);
    expect(isNumber(Object(1))).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
  });

  it('incorrect', () => {
    const expected = falsy.map((item) => typeof item === 'number');
    const actual = falsy.map(isNumber);

    expect(expected).toEqual(actual);

    expect(isNumber(args)).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(new Error())).toBe(false);
    expect(isNumber({ a: 1, b: 2 })).toBe(false);
    expect(isNumber('a')).toBe(false);
    expect(isNumber(/x/)).toBe(false);
    expect(isNumber(symbol)).toBe(false);
    expect(isNumber(null)).toBe(false);
  });
});
