import { isSymbol } from '../../src';
import { args, falsy } from '../_utils';
import { symbol } from '../_utils';

describe('isSymbol', () => {
  it('corrent', () => {
    expect(isSymbol(symbol)).toBe(true);
    expect(isSymbol(Object(symbol))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isSymbol(item)).toBe(false);
    });

    expect(isSymbol('abc')).toBe(false);
    expect(isSymbol(args)).toBe(false);
    expect(isSymbol([1, 2, 3])).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    expect(isSymbol(new Error())).toBe(false);
    expect(isSymbol({ a: 1, b: 2 })).toBe(false);
    expect(isSymbol({ constructor: false })).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(/x/)).toBe(false);
  });
});
