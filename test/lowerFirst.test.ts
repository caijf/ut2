import { lowerFirst } from '../src';

describe('lowerFirst', () => {
  it('转换首个字符为小写', () => {
    expect(lowerFirst('bar')).toBe('bar');
    expect(lowerFirst('Bar')).toBe('bar');
    expect(lowerFirst('BAR')).toBe('bAR');
  });

  it('首个字符非英文字母，没有变化', () => {
    expect(lowerFirst(' bar')).toBe(' bar');
    expect(lowerFirst('1bar')).toBe('1bar');
    expect(lowerFirst('-bar')).toBe('-bar');
  });
});
