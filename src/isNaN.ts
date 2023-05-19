import { root } from './internals/native';
import isNumber from './isNumber';

/**
 * 检查值是否为 `NaN` 。
 *
 * 同 `Number.isNaN` 。
 *
 * @static
 * @alias module:Type.isNaN
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `NaN`
 * @example
 *
 * isNaN(NaN); // true
 *
 * isNaN(new Number(NaN)); // true
 *
 * isNaN(1); // false
 *
 */
function isNaN(value: any) {
  return isNumber(value) && root.isNaN(value);
}

export default isNaN;
