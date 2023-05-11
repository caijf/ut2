import { isSymbol } from '../../src';

describe('isSymbol', () => {
  it('Symbol.iterator => true', () => {
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });
  it('"abc" => false', () => {
    expect(isSymbol('abc')).toBe(false);
  });
});
