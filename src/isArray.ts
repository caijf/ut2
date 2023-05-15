import isType from './internals/isType';

/**
 * 检查值是否为 Array 。
 *
 * @static
 * @alias module:Type.isArray
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Array
 * @example
 *
 * isArray([1, 2, 3]); // true
 * isArray(1); // false
 *
 */
function isArray(value: any) {
  return Array.isArray(value) || isType(value, 'Array');
}

export default isArray;
