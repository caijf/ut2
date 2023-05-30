import { snakeCase } from '../src';

describe('snakeCase', () => {
  it('basic', () => {
    expect(snakeCase('Foo Bar')).toBe('foo_bar');
    expect(snakeCase('--foo-bar--')).toBe('foo_bar');
    expect(snakeCase('FOO BAR')).toBe('foo_bar');
    expect(snakeCase('__FOO_BAR__')).toBe('foo_bar');
    expect(snakeCase('12 feat')).toBe('12_feat');
    expect(snakeCase('safe HTML')).toBe('safe_html');
  });

  it('混合数字和大小写不拆分', () => {
    expect(snakeCase('12h format')).toBe('12h_format');
    expect(snakeCase('enable 12h format')).toBe('enable_12h_format');
    expect(snakeCase('safeHTML')).toBe('safehtml');
    expect(snakeCase('XMLHttpRequest')).toBe('xmlhttprequest');
  });

  it('自定义拆分词组', () => {
    expect(snakeCase('abcd', /ab|cd/g)).toEqual('ab_cd');
    expect(snakeCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('fred_barney_&_pebbles');
  });
});
