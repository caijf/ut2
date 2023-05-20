import { isUndefined } from '../../src';
import { args, falsy, symbol } from '../_utils';

describe('isUndefined', () => {
  it('corrent', () => {
    // @ts-ignore
    expect(isUndefined()).toBe(true);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(void 0)).toBe(true);
  });

  it('incorrent', () => {
    falsy
      .filter((item) => item !== undefined)
      .forEach((item) => {
        expect(isUndefined(item)).toBe(false);
      });

    expect(isUndefined(args)).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Error())).toBe(false);
    expect(isUndefined({ a: 1, b: 2 })).toBe(false);
    expect(isUndefined({ constructor: false })).toBe(false);
    expect(isUndefined('abc')).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(/x/)).toBe(false);
    expect(isUndefined(symbol)).toBe(false);
  });
});
