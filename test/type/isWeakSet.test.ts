import { isWeakSet } from '../../src';

describe('isWeakSet', () => {
  it('new WeakSet => true', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });
  it('new Set => false', () => {
    expect(isWeakSet(new Set())).toBe(false);
  });
});
