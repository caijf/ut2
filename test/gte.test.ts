import { gte } from '../src';

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
});
