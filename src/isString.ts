import isType from './internals/isType';

/**
 * 检查值是否为 String 。
 *
 * @static
 * @alias module:Type.isString
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 String
 * @example
 *
 * isString('abc'); // true
 * isString(1); // false
 *
 */
function isString(value: any) {
  return isType(value, 'String');
}

export default isString;
