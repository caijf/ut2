import { isBoolean } from '../../src';

describe('isBoolean', () => {
  it('false => true', () => {
    expect(isBoolean(false)).toBe(true);
  });
  it('null => false', () => {
    expect(isBoolean(null)).toBe(false);
  });
});
