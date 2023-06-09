import { camelCase } from '../src';

describe('camelCase', () => {
  it('basic', () => {
    expect(camelCase('Foo Bar')).toBe('fooBar');
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('FOO BAR')).toBe('fooBar');
    expect(camelCase('__FOO_BAR__')).toBe('fooBar');
    expect(camelCase('12 feat')).toBe('12Feat');
    expect(camelCase('safe HTML')).toBe('safeHtml');
  });

  it('混合数字和大小写不拆分', () => {
    expect(camelCase('12h format')).toBe('12hFormat');
    expect(camelCase('enable 12h format')).toBe('enable12hFormat');
    expect(camelCase('safeHTML')).toBe('safehtml');
    expect(camelCase('XMLHttpRequest')).toBe('xmlhttprequest');
  });

  it('自定义拆分词组', () => {
    expect(camelCase('abcd', /ab|cd/g)).toEqual('abCd');
    expect(camelCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('fredBarney&Pebbles');
  });
});
