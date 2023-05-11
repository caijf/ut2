import isType from './isType';

/**
 * 检查值是否为Map
 *
 * @static
 * @alias module:Type.isMap
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Map
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
