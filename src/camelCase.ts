import splitCaseWords from './internals/splitCaseWords';
import upperFirst from './upperFirst';

/**
 * 转换字符串为驼峰写法。
 *
 * @alias module:String.camelCase
 * @since 1.0.0
 * @see {@link https://en.wikipedia.org/wiki/Camel_case Camel_case}
 * @param {string} string 要转换的字符串。
 * @param {RegExp | string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 驼峰写法的字符串。
 * @example
 *
 * camelCase('foo bar'); // 'fooBar'
 *
 * camelCase('foo-bar'); // 'fooBar'
 *
 * camelCase('Foo Bar'); // 'fooBar'
 *
 * camelCase('FOO BAR'); // 'fooBar'
 *
 * camelCase('--FOO-BAR--'); // 'fooBar'
 *
 * camelCase('__FOO_BAR__'); // 'fooBar'
 *
 */
function camelCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce((prev, cur, index) => {
    cur = cur.toLowerCase();
    return prev + (index ? upperFirst(cur) : cur);
  }, '');
}

export default camelCase;
