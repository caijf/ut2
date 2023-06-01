import { normalizeNumber } from './internals/normalize';

function clamp(number: number, upper: number): number;
function clamp(number: number, lower: number, upper: number): number;
/**
 * 数字限制在 `lower` 和 `upper` 之间的值。
 *
 * @static
 * @alias module:Number.clamp
 * @since 1.0.0
 * @param {number} number 被限制的值。
 * @param {number} [lower] 下限。
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
 * // 仅限制上限
 * clamp(10, 5); // 5
 *
 * clamp(-10, 5); // -10
 *
 */
function clamp(number: number, lower?: number, upper?: number) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }

  if (upper !== undefined) {
    upper = normalizeNumber(upper);
  }

  if (lower !== undefined) {
    lower = normalizeNumber(lower);
  }

  number = +number;

  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }

  return number;
}

export default clamp;
