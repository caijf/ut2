import createCaseFirst from './internals/createCaseFirst';

/**
 * 转换字符串第一个字符为小写。
 *
 * @static
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
 */
function lowerFirst(string: string) {
  return createCaseFirst('toLowerCase')(string);
}

export default lowerFirst;
