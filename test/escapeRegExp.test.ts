import { escapeRegExp } from '../src';

describe('escapeRegExp', () => {
  const escaped = '\\^\\$\\.\\*\\+\\?\\-\\(\\)\\[\\]\\{\\}\\|\\\\';
  const unescaped = '^$.*+?-()[]{}|\\';

  it('转义字符', () => {
    expect(escapeRegExp(unescaped)).toBe(escaped);
    expect(escapeRegExp('\\')).toBe('\\\\');
    expect(escapeRegExp('-+=')).toBe('\\-\\+=');
    expect(escapeRegExp('[ut2](https://caijf.github.io/ut2/)')).toBe(
      '\\[ut2\\]\\(https://caijf\\.github\\.io/ut2/\\)'
    );
  });

  it('不包含转义字符，返回原值', () => {
    expect(escapeRegExp('abc')).toBe('abc');
  });

  it('错误的参数，返回空字符串', () => {
    // @ts-ignore
    expect(escapeRegExp(undefined)).toBe('');
    // @ts-ignore
    expect(escapeRegExp(null)).toBe('');
  });
});
