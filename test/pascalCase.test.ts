import { pascalCase } from '../src';

describe('pascalCase', () => {
  it('basic', () => {
    expect(pascalCase('Foo Bar')).toBe('FooBar');
    expect(pascalCase('--foo-bar--')).toBe('FooBar');
    expect(pascalCase('FOO BAR')).toBe('FooBar');
    expect(pascalCase('__FOO_BAR__')).toBe('FooBar');
    expect(pascalCase('12 feat')).toBe('12Feat');
    expect(pascalCase('safe HTML')).toBe('SafeHtml');
  });

  it('混合数字和大小写不拆分', () => {
    expect(pascalCase('12h format')).toBe('12hFormat');
    expect(pascalCase('enable 12h format')).toBe('Enable12hFormat');
    expect(pascalCase('safeHTML')).toBe('Safehtml');
    expect(pascalCase('XMLHttpRequest')).toBe('Xmlhttprequest');
  });

  it('自定义拆分词组', () => {
    expect(pascalCase('abcd', /ab|cd/g)).toEqual('AbCd');
    expect(pascalCase('fred, barney, & pebbles', /[^, ]+/g)).toEqual('FredBarney&Pebbles');
  });
});
