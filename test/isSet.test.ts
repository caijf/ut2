import { isSet } from '../src';
import { args, falsy, symbol } from './_utils';

describe('isSet', () => {
  it('corrent', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isSet(item)).toBe(false);
    });

    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet(args)).toBe(false);
    expect(isSet([1, 2, 3])).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(new Date())).toBe(false);
    expect(isSet(new Error())).toBe(false);
    expect(isSet({ a: 1, b: 2 })).toBe(false);
    expect(isSet({ constructor: false })).toBe(false);
    expect(isSet(1)).toBe(false);
    expect(isSet('a')).toBe(false);
    expect(isSet(/x/)).toBe(false);
    expect(isSet(symbol)).toBe(false);
  });
});
