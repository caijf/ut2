import decimalAdjust from './internals/decimalAdjust';

/**
 * 根据精度向下舍入 `number` 。
 *
 * 注：精度可以理解为保留几位小数。
 *
 * @static
 * @alias module:Math.floor
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#小数舍入 | 小数舍入}
 * @param {number} number 要向下舍入的值。
 * @param {number} [precision=0] 向下舍入的精度。
 * @returns {number} 向下舍入的值。
 * @example
 *
 * floor(4.16); // 4
 *
 * floor(4.16, 1); // 4.1
 *
 * floor(4160, -2); // 4100
 */
function floor(number: number, precision?: number) {
  return decimalAdjust('floor', number, precision);
}

export default floor;
