import { isInteger } from '../src';
import { args, symbol } from './_utils';

describe('isInteger', () => {
  it('corrent', () => {
    const values = [-1, 0, 1, 2e64, Math.pow(2, 53)];
    values.forEach((item) => {
      expect(isInteger(item)).toBe(true);
    });
  });

  it('incorrent', () => {
    const values = [3.14, Math.PI, Number.MIN_VALUE, Infinity, -Infinity, '10', true, false, null];
    values.forEach((item) => {
      expect(isInteger(item)).toBe(false);
    });

    expect(isInteger(args)).toBe(false);
    expect(isInteger([1, 2, 3])).toBe(false);
    expect(isInteger({ a: 1, b: 2 })).toBe(false);
    expect(isInteger('a')).toBe(false);
    expect(isInteger(new Date())).toBe(false);
    expect(isInteger(new Error())).toBe(false);
    expect(isInteger(/x/)).toBe(false);
    expect(isInteger(symbol)).toBe(false);
  });
});
