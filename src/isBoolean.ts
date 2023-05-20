import isType from './internals/isType';

/**
 * 检查值是否为布尔基元或对象。
 *
 * @static
 * @alias module:Type.isBoolean
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为布尔基元或对象
 * @example
 *
 * isBoolean(false); // true
 *
 * isBoolean(new Boolean(false)); // true
 *
 * isBoolean(Object(false)); // true
 *
 * isBoolean(new Boolean(false)); // true
 *
 * isBoolean(null); // false
 *
 */
function isBoolean(value: any) {
  return value === true || value === false || isType(value, 'Boolean');
}

export default isBoolean;
