import { kebabCase } from '../src';

describe('kebabCase', () => {
  it('basic', () => {
    expect(kebabCase('Foo Bar')).toBe('foo-bar');
    expect(kebabCase('--foo-bar--')).toBe('foo-bar');
    expect(kebabCase('FOO BAR')).toBe('foo-bar');
    expect(kebabCase('__FOO_BAR__')).toBe('foo-bar');
    expect(kebabCase('12 feat')).toBe('12-feat');
    expect(kebabCase('safe HTML')).toBe('safe-html');
  });

  it('混合数字和大小写不拆分', () => {
    expect(kebabCase('12h format')).toBe('12h-format');
    expect(kebabCase('enable 12h format')).toBe('enable-12h-format');
    expect(kebabCase('safeHTML')).toBe('safehtml');
    expect(kebabCase('XMLHttpRequest')).toBe('xmlhttprequest');
  });

  it('自定义拆分词组', () => {
    expect(kebabCase('abcd', /ab|cd/g)).toEqual('ab-cd');
    expect(kebabCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('fred-barney-&-pebbles');
  });
});
