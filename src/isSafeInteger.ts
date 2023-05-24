import { MAX_SAFE_INTEGER } from './internals/native';
import { numberIsSafeInteger } from './internals/helpers';
import isInteger from './isInteger';

/**
 * 检查值是否为安全整数。
 *
 * 同 `Number.isSafeInteger` 。
 *
 * 如果一个整数是一个 `IEEE-754` 双精度数字，它不是四舍五入的不安全整数的结果，那么它就是安全的。安全整数范围为 `-(2^53 - 1)` 到 `2^53 - 1` 之间的整数，包含 `-(2^53 - 1)` 和 `2^53 - 1`。
 *
 * @static
 * @alias module:Type.isSafeInteger
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为安全整数，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isSafeInteger(1); // true
 *
 * isSafeInteger(Infinity); // false
 *
 * isSafeInteger(Number.MIN_VALUE); // false
 *
 * isSafeInteger('1'); // false
 *
 * isSafeInteger(null); // false
 *
 */
function isSafeInteger(value: any) {
  return numberIsSafeInteger
    ? numberIsSafeInteger(value)
    : isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}

export default isSafeInteger;
