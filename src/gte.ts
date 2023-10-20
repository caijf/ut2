import { baseGte, createOperation } from './internals/comparator';

/**
 * 检查 `value` 是否大于或等于 `other` 。
 *
 * @function
 * @alias module:Util.gte
 * @since 1.0.0
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @returns {boolean} 如果 `value` 大于或等于 `other` 返回 `true` ，否则返回 `false` 。
 * @example
 *
 * gte(1, 3); // false
 *
 * gte(3, 3); // true
 *
 * gte(3, 1); // true
 *
 */
const gte = createOperation(baseGte);

export default gte;
