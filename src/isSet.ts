import isType from './internals/isType';
import { nodeIsSet } from './internals/nodeUtil';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Set` 对象。
 *
 * @static
 * @alias module:Type.isSet
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Set` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isSet(new Set); // true
 *
 * isSet(new WeakSet); // false
 *
 */
function isSet(value: any): value is Set<any> {
  return nodeIsSet ? nodeIsSet(value) : isObjectLike(value) && isType(value, 'Set');
}

export default isSet;
