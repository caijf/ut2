import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from './internals/native';
import toInteger from './toInteger';

/**
 * 转换 `value` 为一个安全整数。
 *
 * @static
 * @alias module:Util.toSafeInteger
 * @since 1.0.0
 * @param {*} value 要转换的值。
 * @returns {number} 转换后的整数。
 * @example
 *
 * toSafeInteger(3.2); // 3
 *
 * toSafeInteger('3.2'); // 3
 *
 * toSafeInteger(-0); // -0
 *
 * toSafeInteger('-0'); // -0
 *
 * toSafeInteger('0'); // 0
 *
 * toSafeInteger(NaN); // 0
 *
 * toSafeInteger(Infinity); // 9007199254740991
 *
 * toSafeInteger(-Infinity); // -9007199254740991
 *
 */
function toSafeInteger(value: any): number {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toInteger(value);
  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }
  if (value < MIN_SAFE_INTEGER) {
    return MIN_SAFE_INTEGER;
  }
  return value;
}

export default toSafeInteger;
