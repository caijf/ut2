import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsMap: types.isMap
}));

import { isMap } from '../../src';
import { args, falsy, symbol } from '../_utils';

describe('isMap', () => {
  it('corrent', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isMap(item)).toBe(false);
    });

    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(args)).toBe(false);
    expect(isMap([1, 2, 3])).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(new Date())).toBe(false);
    expect(isMap(new Error())).toBe(false);
    expect(isMap({ a: 1, b: 2 })).toBe(false);
    expect(isMap({ constructor: false })).toBe(false);
    expect(isMap(1)).toBe(false);
    expect(isMap('a')).toBe(false);
    expect(isMap(/x/)).toBe(false);
    expect(isMap(symbol)).toBe(false);
  });
});
