import { isNull } from '../../src';
import { args, falsy, symbol } from '../_utils';

describe('isNull', () => {
  it('corrent', () => {
    expect(isNull(null)).toBe(true);
  });

  it('incorrent', () => {
    const expected = falsy.map((item) => item === null);
    const actual = falsy.map(isNull);

    expect(expected).toEqual(actual);

    expect(isNull(args)).toBe(false);
    expect(isNull([1, 2, 3])).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(new Error())).toBe(false);
    expect(isNull({ a: 1, b: 2 })).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull('a')).toBe(false);
    expect(isNull(/x/)).toBe(false);
    expect(isNull(symbol)).toBe(false);
  });
});
