import splitCaseWords from './internals/splitCaseWords';

/**
 * 转换字符串为连接符小写。
 *
 * @static
 * @alias module:String.kebabCase
 * @since 1.0.0
 * @see {@link https://en.wikipedia.org/wiki/Letter_case#Special_case_styles kebab case}
 * @param {string} string 要转换的字符串。
 * @param {RegExp | string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * kebabCase('foo bar'); // 'foo-bar'
 *
 * kebabCase('foo-bar'); // 'foo-bar'
 *
 * kebabCase('Foo Bar'); // 'foo-bar'
 *
 * kebabCase('FOO BAR'); // 'foo-bar'
 *
 * kebabCase('--FOO-BAR--'); // 'foo-bar'
 *
 * kebabCase('__FOO_BAR__'); // 'foo-bar'
 *
 */
function kebabCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce((prev, cur, index) => prev + (index ? '-' : '') + cur.toLowerCase(), '');
}

export default kebabCase;
