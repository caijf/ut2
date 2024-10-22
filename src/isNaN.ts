import root from './internals/root';
import isNumber from './isNumber';

/**
 * 检查值是否为 `NaN`。
 *
 * 和 `Number.isNaN` 区别是 `new Number(NaN)` 也被认为是 `NaN`。
 *
 * @alias module:Language.isNaN
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `NaN`，返回 `true`，否则返回 `false`。
 * @example
 *
 * isNaN(NaN); // true
 *
 * isNaN(new Number(NaN)); // true
 *
 * isNaN(1); // false
 *
 */
function isNaN(value: any): boolean {
  return isNumber(value) && root.isNaN(value);
}

export default isNaN;
