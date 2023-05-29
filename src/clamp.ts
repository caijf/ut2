/**
 * 数字限制在 `lower` 和 `upper` 之间的值。
 *
 * @static
 * @alias module:Number.clamp
 * @since 1.0.0
 * @param {number} number 被限制的值。
 * @param {number} lower 下限。
 * @param {number} upper 上限。
 * @returns {number} 被限制的值。
 * @example
 *
 * clamp(-10, -5, 5); // -5
 *
 * clamp(-10, 0, 5); // 0
 *
 * clamp(10, -5, 5); // 5
 *
 */
function clamp(number: number, lower: number, upper: number) {
  let num = +number;
  let low = +lower;
  let up = +upper;

  low = low === low ? low : 0;
  up = up === up ? up : 0;

  if (num === num) {
    num = num <= up ? num : up;
    num = num >= low ? num : low;
  }

  return num;
}

export default clamp;
