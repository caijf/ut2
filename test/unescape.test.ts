import { unescape } from '../src';

describe('unescape', () => {
  const escaped = '&amp;&lt;&gt;&quot;&#39;/';
  const unescaped = '&<>"\'/';

  it('转换为 HTML 实体字符', () => {
    expect(unescape(escaped)).toBe(unescaped);
    expect(unescape('&amp;lt;')).toBe('&lt;');
    expect(unescape('&#39;')).toBe("'");
    expect(unescape('&#039;')).toBe("'");
    expect(unescape('&#00039;')).toBe("'");
    expect(unescape('&lt;script&gt;&lt;/script&gt;')).toBe('<script></script>');
    expect(unescape('&amp;')).toBe('&');
  });

  it('不包含需要转换的字符', () => {
    expect(unescape('abc')).toBe('abc');
    expect(unescape('&#96;')).toBe('&#96;');
    expect(unescape('&#x2f;')).toBe('&#x2f;');
  });

  it('错误的参数', () => {
    expect(unescape('')).toBe('');
    // @ts-ignore
    expect(unescape(false)).toBe('false');
    // @ts-ignore
    expect(unescape(true)).toBe('true');
  });
});
