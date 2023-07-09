import splitCaseWords from './internals/splitCaseWords';

/**
 * 转换字符串为空格分隔的小写单词。
 *
 * @static
 * @alias module:String.lowerCase
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @param {RegExp | string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 小写字符串。
 * @example
 *
 * lowerCase('foo bar'); // 'foo bar'
 *
 * lowerCase('foo-bar'); // 'foo bar'
 *
 * lowerCase('Foo Bar'); // 'foo bar'
 *
 * lowerCase('FOO BAR'); // 'foo bar'
 *
 * lowerCase('--FOO-BAR--'); // 'foo bar'
 *
 * lowerCase('__FOO_BAR__'); // 'foo bar'
 *
 */
function lowerCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce((prev, cur, index) => prev + (index ? ' ' : '') + cur.toLowerCase(), '');
}

export default lowerCase;
