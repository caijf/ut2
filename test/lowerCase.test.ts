import { lowerCase } from '../src';

describe('lowerCase', () => {
  it('basic', () => {
    expect(lowerCase('Foo Bar')).toBe('foo bar');
    expect(lowerCase('--foo-bar--')).toBe('foo bar');
    expect(lowerCase('FOO BAR')).toBe('foo bar');
    expect(lowerCase('__FOO_BAR__')).toBe('foo bar');
    expect(lowerCase('12 feat')).toBe('12 feat');
    expect(lowerCase('safe HTML')).toBe('safe html');
  });

  it('混合数字和大小写不拆分', () => {
    expect(lowerCase('12h format')).toBe('12h format');
    expect(lowerCase('enable 12h format')).toBe('enable 12h format');
    expect(lowerCase('safeHTML')).toBe('safehtml');
    expect(lowerCase('XMLHttpRequest')).toBe('xmlhttprequest');
  });

  it('自定义拆分词组', () => {
    expect(lowerCase('abcd', /ab|cd/g)).toEqual('ab cd');
    expect(lowerCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('fred barney & pebbles');
  });
});
