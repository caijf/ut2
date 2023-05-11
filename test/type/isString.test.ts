import { isString } from '../../src';

describe('isString', () => {
  it('"abc" => true', () => {
    expect(isString('abc')).toBe(true);
  });
  it('1 => false', () => {
    expect(isString(1)).toBe(false);
  });
});
