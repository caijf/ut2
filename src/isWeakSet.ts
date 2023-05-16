import isType from './internals/isType';

/**
 * 检查值是否为 WeakSet 。
 *
 * @static
 * @alias module:Type.isWeakSet
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 WeakSet
 * @example
 *
 * isWeakSet(new WeakSet); // true
 * isWeakSet(new Set); // false
 *
 */
function isWeakSet(value: any) {
  return isType(value, 'WeakSet');
}

export default isWeakSet;
