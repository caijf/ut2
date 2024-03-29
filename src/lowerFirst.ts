import createCaseFirst from './internals/createCaseFirst';

/**
 * 转换字符串第一个字符为小写。
 *
 * @function
 * @alias module:String.lowerFirst
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * lowerFirst('Bar'); // 'bar'
 *
 * lowerFirst('BAR'); // 'bAR'
 *
 * lowerFirst('--Foo-bar--'); // '--Foo-bar--' 不进行分词处理
 *
 * lowerFirst('Foo-bar'); // 'foo-bar'
 *
 */
const lowerFirst = createCaseFirst('toLowerCase');

export default lowerFirst;
