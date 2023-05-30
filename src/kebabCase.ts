import words from './words';

/**
 * 转换字符串为连接符小写。
 *
 * @static
 * @alias module:String.kebabCase
 * @since 1.0.0
 * @see {@link https://en.wikipedia.org/wiki/Letter_case#Special_case_styles | kebab case}
 * @param {string} string 要转换的字符串。
 * @param {RegExp|string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * camelCase('foo bar'); // 'foo-bar'
 *
 * camelCase('foo-bar'); // 'foo-bar'
 *
 * camelCase('Foo Bar'); // 'foo-bar'
 *
 * camelCase('FOO BAR'); // 'foo-bar'
 *
 * camelCase('--FOO-BAR--'); // 'foo-bar'
 *
 * camelCase('__FOO_BAR__'); // 'foo-bar'
 *
 */
function kebabCase(string: string, pattern?: RegExp | string) {
  return words(String(string).replace(/['\u2019]/g, ''), pattern).reduce(
    (prev, cur, index) => prev + (index ? '-' : '') + cur.toLowerCase(),
    ''
  );
}

export default kebabCase;
