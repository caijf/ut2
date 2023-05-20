import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `WeakSet` 对象。
 *
 * @static
 * @alias module:Type.isWeakSet
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `WeakSet` 对象
 * @example
 *
 * isWeakSet(new WeakSet); // true
 *
 * isWeakSet(new Set); // false
 *
 */
function isWeakSet(value: any) {
  return isObjectLike(value) && isType(value, 'WeakSet');
}

export default isWeakSet;
