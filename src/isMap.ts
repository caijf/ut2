import isType from './internals/isType';
import { nodeIsMap } from './internals/nodeUtil';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Map` 对象。
 *
 * @static
 * @alias module:Type.isMap
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Map` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isMap(new Map); // true
 *
 * isMap(new WeakMap); // false
 *
 */
function isMap(value: any) {
  return nodeIsMap ? nodeIsMap(value) : isObjectLike(value) && isType(value, 'Map');
}

export default isMap;
