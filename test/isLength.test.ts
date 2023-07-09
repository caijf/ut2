import { isLength } from '../src';

describe('isLength', () => {
  it('correct', () => {
    const values = [0, 1, 3, Number.MAX_SAFE_INTEGER];
    values.forEach((item) => {
      expect(isLength(item)).toBe(true);
    });
  });

  it('incorrect', () => {
    const values = [-1, '1', 1.1, Number.MAX_SAFE_INTEGER + 1, Infinity, -Infinity, Number.MIN_VALUE, Number.MAX_VALUE];
    values.forEach((item) => {
      expect(isLength(item)).toBe(false);
    });
  });
});
