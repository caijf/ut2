import decimalAdjust from './internals/decimalAdjust';

/**
 * 根据精度四舍五入 `number` 。
 *
 * 注：精度可以理解为保留几位小数。
 *
 * @static
 * @alias module:Math.round
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round#小数舍入 | 小数舍入}
 * @param {number} number 要四舍五入的值。
 * @param {number} [precision=0] 四舍五入的精度。
 * @returns {number} 四舍五入的值。
 * @example
 *
 * round(4.16); // 4
 *
 * round(4.16, 1); // 4.2
 *
 * round(4160, -2); // 4200
 */
function round(number: number, precision = 0) {
  return decimalAdjust('round', number, precision);
}

export default round;
