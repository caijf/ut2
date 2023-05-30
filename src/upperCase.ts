import splitCaseWords from './internals/splitCaseWords';

/**
 * 转换字符串为空格分隔的大写单词。
 *
 * @static
 * @alias module:String.upperCase
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @param {RegExp|string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 大写字符串。
 * @example
 *
 * upperCase('foo bar'); // 'FOO BAR'
 *
 * upperCase('foo-bar'); // 'FOO BAR'
 *
 * upperCase('Foo Bar'); // 'FOO BAR'
 *
 * upperCase('FOO BAR'); // 'FOO BAR'
 *
 * upperCase('--FOO-BAR--'); // 'FOO BAR'
 *
 * upperCase('__FOO_BAR__'); // 'FOO BAR'
 *
 */
function upperCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce(
    (prev, cur, index) => prev + (index ? ' ' : '') + cur.toUpperCase(),
    ''
  );
}

export default upperCase;
