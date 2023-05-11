import { isUndefined } from '../../src';

describe('isUndefined', () => {
  it('undefined => true', () => {
    // @ts-ignore
    expect(isUndefined()).toBe(true);
    expect(isUndefined(undefined)).toBe(true);
  });
  it('void 0 => true', () => {
    expect(isUndefined(void 0)).toBe(true);
  });
  it('null => false', () => {
    expect(isUndefined(null)).toBe(false);
  });
});
