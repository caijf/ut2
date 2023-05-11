import { isMap } from '../../src';

describe('isMap', () => {
  it('new Map => true', () => {
    expect(isMap(new Map())).toBe(true);
  });
  it('new WeakMap => false', () => {
    expect(isMap(new WeakMap())).toBe(false);
  });
});
