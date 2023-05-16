import isType from './internals/isType';

/**
 * 检查值是否为 Map 。
 *
 * @static
 * @alias module:Type.isMap
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 Map
 * @example
 *
 * isMap(new Map); // true
 * isMap(new WeakMap); // false
 *
 */
function isMap(value: any) {
  return isType(value, 'Map');
}

export default isMap;
