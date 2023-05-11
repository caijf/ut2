import { isNull } from '../../src';

describe('isNull', () => {
  it('null => true', () => {
    expect(isNull(null)).toBe(true);
  });
  it('false => false', () => {
    expect(isNull(false)).toBe(false);
  });
});
