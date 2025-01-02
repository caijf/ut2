import splitCaseWords from './internals/splitCaseWords';
import upperFirst from './upperFirst';

/**
 * 转换字符串为帕斯卡写法。又名为大驼峰写法。
 *
 * @alias module:String.pascalCase
 * @since 1.8.0
 * @see {@link https://en.wikipedia.org/wiki/Camel_case Camel_case}
 * @param {string} string 要转换的字符串。
 * @param {RegExp | string} [pattern] 拆分词组的匹配模式。
 * @returns {string} 帕斯卡写法的字符串。
 * @example
 *
 * pascalCase('foo bar'); // 'FooBar'
 *
 * pascalCase('foo-bar'); // 'FooBar'
 *
 * pascalCase('Foo Bar'); // 'FooBar'
 *
 * pascalCase('FOO BAR'); // 'FooBar'
 *
 * pascalCase('--FOO-BAR--'); // 'FooBar'
 *
 * pascalCase('__FOO_BAR__'); // 'FooBar'
 *
 */
function pascalCase(string: string, pattern?: RegExp | string) {
  return splitCaseWords(string, pattern).reduce((prev, cur) => {
    cur = cur.toLowerCase();
    return prev + upperFirst(cur);
  }, '');
}

export default pascalCase;
