import isType from './internals/isType';

/**
 * 检查值是否为 Boolean 。
 *
 * @static
 * @alias module:Type.isBoolean
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Boolean
 * @example
 *
 * isBoolean(false); // true
 * isBoolean(null); // false
 *
 */
function isBoolean(value: any) {
  return value === true || value === false || isType(value, 'Boolean');
}

export default isBoolean;
