import { capitalize } from '../src';

describe('capitalize', () => {
  it('转换首个字符为小写', () => {
    expect(capitalize('bar')).toBe('Bar');
    expect(capitalize('Bar')).toBe('Bar');
    expect(capitalize('BAR')).toBe('Bar');
  });

  it('首个字符非英文字母，首字母没有变化', () => {
    expect(capitalize(' bar')).toBe(' bar');
    expect(capitalize('1bar')).toBe('1bar');
    expect(capitalize('-bar')).toBe('-bar');
    expect(capitalize('-Bar')).toBe('-bar');
    expect(capitalize('-BAR')).toBe('-bar');
  });
});
