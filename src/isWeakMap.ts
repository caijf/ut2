import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `WeakMap` 对象。
 *
 * @static
 * @alias module:Type.isWeakMap
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `WeakMap` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isWeakMap(new WeakMap); // true
 *
 * isWeakMap(new Map); // false
 *
 */
function isWeakMap(value: any) {
  return isObjectLike(value) && isType(value, 'WeakMap');
}

export default isWeakMap;
