import { isSafeInteger } from '../src';
import { args, symbol } from './_utils';

describe('isSafeInteger', () => {
  it('correct', () => {
    const values = [-1, 0, 1, Math.pow(2, 53) - 1, -(Math.pow(2, 53) - 1)];
    values.forEach((item) => {
      expect(isSafeInteger(item)).toBe(true);
    });
  });

  it('incorrect', () => {
    const values = [Math.pow(2, 53), 2e64, 3.14, Math.PI, Number.MIN_VALUE, Infinity, -Infinity, '10', true, false, null];
    values.forEach((item) => {
      expect(isSafeInteger(item)).toBe(false);
    });

    expect(isSafeInteger(args)).toBe(false);
    expect(isSafeInteger([1, 2, 3])).toBe(false);
    expect(isSafeInteger({ a: 1, b: 2 })).toBe(false);
    expect(isSafeInteger('a')).toBe(false);
    expect(isSafeInteger(new Date())).toBe(false);
    expect(isSafeInteger(new Error())).toBe(false);
    expect(isSafeInteger(/x/)).toBe(false);
    expect(isSafeInteger(symbol)).toBe(false);
  });
});
