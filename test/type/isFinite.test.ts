import { isFinite } from '../../src';
import { args, symbol } from '../_utils';

describe('isFinite', () => {
  it('corrent', () => {
    const values = [0, 1, 3.14, -1, 2e64, Number.MIN_VALUE, Math.PI];
    values.forEach((item) => {
      expect(isFinite(item)).toBe(true);
    });
  });

  it('incorrent', () => {
    const values = [Infinity, NaN, -Infinity, '0', null];
    values.forEach((item) => {
      expect(isFinite(item)).toBe(false);
    });

    expect(isFinite(args)).toBe(false);
    expect(isFinite([1, 2, 3])).toBe(false);
    expect(isFinite({ a: 1, b: 2 })).toBe(false);
    expect(isFinite('a')).toBe(false);
    expect(isFinite(new Date())).toBe(false);
    expect(isFinite(new Error())).toBe(false);
    expect(isFinite(/x/)).toBe(false);
    expect(isFinite(symbol)).toBe(false);
  });
});
