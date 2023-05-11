import { isRegExp } from '../../src';

describe('isRegExp', () => {
  it('/abc/ => true', () => {
    expect(isRegExp(/abc/)).toBe(true);
  });
  it('"/abc/" => false', () => {
    expect(isRegExp('/abc/')).toBe(false);
  });
});
