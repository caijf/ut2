import { escape, unescape } from '../src';

describe('escape', () => {
  const escaped = '&amp;&lt;&gt;&quot;&#39;/',
    unescaped = '&<>"\'/';

  it('转义字符', () => {
    expect(escape(unescaped)).toBe(escaped);
    expect(escape('<script></script>')).toBe('&lt;script&gt;&lt;/script&gt;');
    expect(escape('&')).toBe('&amp;');
  });

  it('不包含需要转义的字符', () => {
    expect(escape('abc')).toBe('abc');
    expect(escape('`')).toBe('`');
    expect(escape('/')).toBe('/');
  });

  it('转换为 HTML 实体字符', () => {
    expect(unescape(escaped)).toBe(unescaped);
  });
});
