import decimalAdjust from './internals/decimalAdjust';

/**
 * 根据精度向上舍入 `number`。
 *
 * 注：精度可以理解为保留几位小数。
 *
 * @alias module:Math.ceil
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#小数舍入 小数舍入}
 * @param {number} number 要向上舍入的值。
 * @param {number} [precision=0] 向上舍入的精度。默认 `0`。
 * @returns {number} 向上舍入的值。
 * @example
 *
 * ceil(4.16); // 5
 *
 * ceil(4.16, 1); // 4.2
 *
 * ceil(4160, -2); // 4200
 *
 */
function ceil(number: number, precision?: number) {
  return decimalAdjust('ceil', number, precision);
}

export default ceil;
