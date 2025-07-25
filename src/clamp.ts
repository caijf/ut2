import defaultTo from './defaultTo';
import { nativeUndefined } from './internals/native';
import toNumber from './toNumber';

interface Clamp {
  (number: number, upper: number): number;
  (number: number, lower: number, upper: number): number;
}

/**
 * 数字限制在 `lower` 和 `upper` 之间的值。
 *
 * 特殊说明：
 * - 如果只传入 1 个参数，直接返回该参数；
 * - 如果只传入 2 个参数，`lower` 透传给 `upper`。
 *
 * @function
 * @alias module:Number.clamp
 * @since 1.0.0
 * @param {number} number 被限制的值。
 * @param {number} [lower] 下限。
 * @param {number} upper 上限。
 * @returns {number} 限制后的值。
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
const clamp: Clamp = function (number: number, lower?: number, upper?: number) {
  if (upper === nativeUndefined) {
    upper = lower;
    lower = nativeUndefined;
  }

  if (upper !== nativeUndefined) {
    upper = defaultTo(toNumber(upper), 0);
  }

  if (lower !== nativeUndefined) {
    lower = defaultTo(toNumber(lower), 0);
  }

  number = toNumber(number);

  if (number === number) {
    if (upper !== nativeUndefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== nativeUndefined) {
      number = number >= lower ? number : lower;
    }
  }

  return number;
};

export default clamp;
