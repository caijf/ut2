import { gt } from '../src';

describe('gt', () => {
  it('`value` 大于 `other` 返回 `true`', () => {
    expect(gt(3, 1)).toBe(true);
    expect(gt('d', 'a')).toBe(true);
  });

  it('`value` 小于或等于 `other` 返回 `false`', () => {
    expect(gt(1, 3)).toBe(false);
    expect(gt(3, 3)).toBe(false);
    expect(gt('a', 'd')).toBe(false);
    expect(gt('d', 'd')).toBe(false);
  });
});
