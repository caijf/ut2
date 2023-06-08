import { baseLte, createOperation } from './internals/comparator';

/**
 * 检查 `value` 是否小于或等于 `other` 。
 *
 * @static
 * @alias module:Util.lte
 * @since 1.0.0
 * @param value 要比较的值。
 * @param other 另一个要比较的值。
 * @returns 如果 `value` 小于或等于 `other` 返回 `true` ，否则返回 `false` 。
 * @example
 *
 * lte(1, 3); // true
 *
 * lte(3, 3); // true
 *
 * lte(3, 1); // false
 *
 */
function lte(value: any, other: any) {
  return createOperation(baseLte)(value, other);
}

export default lte;
