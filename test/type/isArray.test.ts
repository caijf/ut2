import { isArray } from '../../src';

describe('isArray', () => {
  it('[] => true', () => {
    expect(isArray([])).toBe(true);
  });
  it('1 => false', () => {
    expect(isArray(1)).toBe(false);
  });
});
