/**
 * 检查值以确定是否应在其位置返回默认值。如果值为 `NaN` `null` 或 `undefined` ，返回 `defaultValue` 。
 *
 * @static
 * @alias module:Util.defaultTo
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @param {*} defaultValue 默认值。
 * @returns {*} 如果值为 `NaN` `null` 或 `undefined` ，返回 `defaultValue` ，否则返回 `value` 。
 * @example
 *
 * defaultTo(undefined, 1); // 1
 *
 * defaultTo(10, 1); // 10
 *
 * defaultTo(null, undefined); // undefined
 *
 */

function defaultTo<T>(value: T | null | undefined, defaultValue: T): T;
function defaultTo<T, D>(value: T | null | undefined, defaultValue: D): T | D;
function defaultTo<T, D>(value: T, defaultValue: D) {
  return value == null || value !== value ? defaultValue : value;
}

export default defaultTo;
