import { lte } from '../src';

describe('lte', () => {
  it('`value` 小于或等于 `other` 返回 `true`', () => {
    expect(lte(1, 3)).toBe(true);
    expect(lte(3, 3)).toBe(true);
    expect(lte('a', 'd')).toBe(true);
    expect(lte('d', 'd')).toBe(true);
  });

  it('`value` 大于 `other` 返回 `false`', () => {
    expect(lte(3, 1)).toBe(false);
    expect(lte('d', 'a')).toBe(false);
  });
});
