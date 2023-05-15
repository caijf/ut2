import { isArrayBuffer } from '../../src';
import { falsy, truthy, symbol, args } from '../_utils';

describe('isArrayBuffer', () => {
  it('correct', () => {
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
  });

  it('incorrect', () => {
    falsy.forEach((item) => {
      expect(isArrayBuffer(item)).toBe(false);
    });

    truthy.forEach((item) => {
      expect(isArrayBuffer(item)).toBe(false);
    });

    expect(isArrayBuffer(args)).toBe(false);
    expect(isArrayBuffer([1, 'a'])).toBe(false);
    expect(isArrayBuffer(symbol)).toBe(false);
    expect(isArrayBuffer(new Error())).toBe(false);
    expect(isArrayBuffer(/x/)).toBe(false);
  });
});
