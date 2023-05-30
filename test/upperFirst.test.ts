import { upperFirst } from '../src';

describe('upperFirst', () => {
  it('转换首个字符为大写', () => {
    expect(upperFirst('bar')).toBe('Bar');
    expect(upperFirst('Bar')).toBe('Bar');
    expect(upperFirst('BAR')).toBe('BAR');
  });

  it('首个字符非英文字母，没有变化', () => {
    expect(upperFirst(' bar')).toBe(' bar');
    expect(upperFirst('1bar')).toBe('1bar');
    expect(upperFirst('-bar')).toBe('-bar');
  });
});
