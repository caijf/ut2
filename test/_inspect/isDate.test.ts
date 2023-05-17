import { types } from 'util';
jest.mock('../../src/internals/nodeUtil.ts', () => ({
  nodeIsDate: types.isDate
}));

import { isDate } from '../../src';
import { args, falsy, symbol } from '../_utils';

describe('isDate', () => {
  it('corrent', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('incorrent', () => {
    falsy.forEach((item) => {
      expect(isDate(item)).toBe(false);
    });

    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate(args)).toBe(false);
    expect(isDate([1, 2, 3])).toBe(false);
    expect(isDate({ a: 1, b: 2 })).toBe(false);
    expect(isDate(new Error())).toBe(false);
    expect(isDate(/x/)).toBe(false);
    expect(isDate(symbol)).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate('a')).toBe(false);
  });
});
