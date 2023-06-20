import { gte } from '../src';
import { symbol } from './_utils';

describe('gte', () => {
  it('`value` 大于或等于 `other` 返回 `true`', () => {
    expect(gte(3, 1)).toBe(true);
    expect(gte(3, 3)).toBe(true);
    expect(gte('d', 'a')).toBe(true);
    expect(gte('d', 'd')).toBe(true);
  });

  it('`value` 小于 `other` 返回 `false`', () => {
    expect(gte(1, 3)).toBe(false);
    expect(gte('a', 'd')).toBe(false);
  });

  it('`Symbol` 值', () => {
    expect(gte(symbol, 1)).toBe(false);
    expect(gte(symbol, {})).toBe(false);
    expect(gte(symbol, [])).toBe(false);
    expect(gte(symbol, null)).toBe(false);
    expect(gte(symbol, symbol)).toBe(false);
  });
});
