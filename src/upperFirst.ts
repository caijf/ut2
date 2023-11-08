import createCaseFirst from './internals/createCaseFirst';

/**
 * 转换字符串第一个字符为大写。
 *
 * @function
 * @alias module:String.upperFirst
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * upperFirst('bar'); // 'Bar'
 *
 * upperFirst('BAR'); // 'BAR'
 *
 * lowerFirst('--foo-bar--'); // '--foo-bar--' 不进行分词处理
 *
 * lowerFirst('foo-bar'); // 'Foo-bar'
 *
 */
const upperFirst = createCaseFirst('toUpperCase');

export default upperFirst;
