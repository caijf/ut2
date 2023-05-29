import { words } from '../src';

describe('words', () => {
  it('basic', () => {
    expect(words('util-helpers')).toEqual(['util', 'helpers']);
    expect(words('util helpers')).toEqual(['util', 'helpers']);
    expect(words('util_helpers')).toEqual(['util', 'helpers']);
    expect(words('util.helpers')).toEqual(['util', 'helpers']);
    expect(words('  util..helpers]')).toEqual(['util', 'helpers']);
    expect(words('  util.helpers ')).toEqual(['util', 'helpers']);
    expect(words('util[helpers')).toEqual(['util', 'helpers']);
    expect(words('-util__%$helpers...')).toEqual(['util', 'helpers']);

    expect(words('Util Helpers')).toEqual(['Util', 'Helpers']);
    expect(words('UTIL HELPERS')).toEqual(['UTIL', 'HELPERS']);
    expect(words('UTIL HELPERS')).toEqual(['UTIL', 'HELPERS']);
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  it('不区分混合数字和大小写词组', () => {
    expect(words('12h')).toEqual(['12h']);
    expect(words('12h format')).toEqual(['12h', 'format']);
    expect(words('enable 12h format')).toEqual(['enable', '12h', 'format']);
    expect(words('pm2')).toEqual(['pm2']);
    expect(words('number2string')).toEqual(['number2string']);
    expect(words('xhr2Request')).toEqual(['xhr2Request']);
    expect(words('XHR')).toEqual(['XHR']);
    expect(words('XHR2Request')).toEqual(['XHR2Request']);
    expect(words('XHRHttpRequest')).toEqual(['XHRHttpRequest']);
    expect(words('XhrHttpRequest')).toEqual(['XhrHttpRequest']);
  });

  it('自定义匹配模式', () => {
    expect(words('abcd', /ab|cd/g)).toEqual(['ab', 'cd']);
    expect(Array.from(words('abcd', /ab|cd/))).toEqual(['ab']);
    expect(words('abcd', /[^bc]+/g)).toEqual(['a', 'd']);
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  it('没有匹配的结果，返回空数组', () => {
    expect(words('abc', /x/g)).toEqual([]);
  });
});
