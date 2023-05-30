import splitCaseWords from './internals/splitCaseWords';

/**
 * 转换字符串为下划线小写。
 *
 * @static
 * @alias module:String.snakeCase
 * @since 1.0.0
 * @see {@link https://en.wikipedia.org/wiki/Snake_case | snake case}
 * @param {string} string 要转换的字符串。
 * @param {RegExp|string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * camelCase('foo bar'); // 'foo_bar'
 *
 * camelCase('foo-bar'); // 'foo_bar'
 *
 * camelCase('Foo Bar'); // 'foo_bar'
 *
 * camelCase('FOO BAR'); // 'foo_bar'
 *
 * camelCase('--FOO-BAR--'); // 'foo_bar'
 *
 * camelCase('__FOO_BAR__'); // 'foo_bar'
 *
 */
function snakeCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce(
    (prev, cur, index) => prev + (index ? '_' : '') + cur.toLowerCase(),
    ''
  );
}

export default snakeCase;
