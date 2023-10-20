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
 */
const upperFirst = createCaseFirst('toUpperCase');

export default upperFirst;
