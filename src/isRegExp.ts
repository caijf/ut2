import isType from './internals/isType';

/**
 * 检查值是否为 RegExp 。
 *
 * @static
 * @alias module:Type.isRegExp
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 RegExp
 * @example
 *
 * isRegExp(/abc/); // true
 * isRegExp('/abc/'); // false
 *
 */
function isRegExp(value: any) {
  return isType(value, 'RegExp');
}

export default isRegExp;
