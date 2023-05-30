import { upperCase } from '../src';

describe('upperCase', () => {
  it('basic', () => {
    expect(upperCase('Foo Bar')).toBe('FOO BAR');
    expect(upperCase('--foo-bar--')).toBe('FOO BAR');
    expect(upperCase('FOO BAR')).toBe('FOO BAR');
    expect(upperCase('__FOO_BAR__')).toBe('FOO BAR');
    expect(upperCase('12 feat')).toBe('12 FEAT');
    expect(upperCase('safe HTML')).toBe('SAFE HTML');
  });

  it('混合数字和大小写不拆分', () => {
    expect(upperCase('12h format')).toBe('12H FORMAT');
    expect(upperCase('enable 12h format')).toBe('ENABLE 12H FORMAT');
    expect(upperCase('safeHTML')).toBe('SAFEHTML');
    expect(upperCase('XMLHttpRequest')).toBe('XMLHTTPREQUEST');
  });

  it('自定义拆分词组', () => {
    expect(upperCase('abcd', /ab|cd/g)).toEqual('AB CD');
    expect(upperCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('FRED BARNEY & PEBBLES');
  });
});
