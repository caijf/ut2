/**
 * 检查数字是否在 `start` 与 `end` 之间，但不包括 `end` 。
 *
 * 如果 `start` 大于 `end` 会自动交换范围参数。
 *
 * @static
 * @alias module:Number.inRange
 * @since 1.0.0
 * @param {number} number 要检查的值。
 * @param {number} start 开始范围。
 * @param {number} [end=0] 结束范围。
 * @returns {number} 如果数字在范围内，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * inRange(3, 2, 4); // true
 *
 * inRange(1, 0, 2); // true
 *
 * inRange(1.2, 0.5, 1.5); // true
 *
 * inRange(2.2, 0.5, 1.5); // false
 *
 * inRange(-2, -2, 4); // true
 *
 * inRange(4, -2, 4); // false
 *
 * // 某个范围为 0 可不传最后一个参数
 * inRange(1， 2); // true
 *
 * inRange(1， -2); // false
 *
 */
function inRange(number: number, start: number, end = 0) {
  return number >= Math.min(start, end) && number < Math.max(start, end);
}

export default inRange;
