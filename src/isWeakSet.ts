import isType from './isType';

/**
 * 检查值是否为WeakSet
 *
 * @static
 * @alias module:Type.isWeakSet
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为WeakSet
 * @example
 *
 * isWeakSet(new WeakSet)
 * // => true
 *
 * isWeakSet(new Set)
 * // => false
 */
function isWeakSet(value: any) {
  return isType(value, 'WeakSet');
}

export default isWeakSet;
