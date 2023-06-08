import { baseGt, createOperation } from './internals/comparator';

/**
 * 检查 `value` 是否大于 `other` 。
 *
 * @static
 * @alias module:Util.gt
 * @since 1.0.0
 * @param value 要比较的值。
 * @param other 另一个要比较的值。
 * @returns 如果 `value` 大于 `other` 返回 `true` ，否则返回 `false` 。
 * @example
 *
 * gt(1, 3); // false
 *
 * gt(3, 3); // false
 *
 * gt(3, 1); // true
 *
 */
function gt(value: any, other: any) {
  return createOperation(baseGt)(value, other);
}

export default gt;
