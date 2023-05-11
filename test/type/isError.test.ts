import { isError } from '../../src';

describe('isError', () => {
  it('new Error => true', () => {
    expect(isError(new Error())).toBe(true);
  });
  it('Error => false', () => {
    expect(isError(Error)).toBe(false);
  });
});
