import { baseLt, createOperation } from './internals/comparator';

/**
 * 检查 `value` 是否小于 `other` 。
 *
 * @function
 * @alias module:Util.lt
 * @since 1.0.0
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @returns {boolean} 如果 `value` 小于 `other` 返回 `true` ，否则返回 `false` 。
 * @example
 *
 * lt(1, 3); // true
 *
 * lt(3, 3); // false
 *
 * lt(3, 1); // false
 *
 */
const lt = createOperation(baseLt);

export default lt;
