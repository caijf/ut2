import { lt } from '../src';

describe('lt', () => {
  it('`value` 小于 `other` 返回 `true`', () => {
    expect(lt(1, 3)).toBe(true);
    expect(lt('a', 'd')).toBe(true);
  });

  it('`value` 大于或等于 `other` 返回 `false`', () => {
    expect(lt(3, 1)).toBe(false);
    expect(lt(3, 3)).toBe(false);
    expect(lt('d', 'a')).toBe(false);
    expect(lt('d', 'd')).toBe(false);
  });
});
