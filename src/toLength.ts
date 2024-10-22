import { MAX_ARRAY_LENGTH } from './internals/native';
import toInteger from './toInteger';

/**
 * 转换 `value` 为数组对象的长度整数。
 *
 * @alias module:Util.toLength
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length | length}
 * @param {*} value 要转换的值。
 * @returns {number} 转换后的整数。
 * @example
 *
 * toLength(3.2); // 3
 *
 * toLength('3.2'); // 3
 *
 * toLength(-0); // 0
 *
 * toLength('-0'); // 0
 *
 * toLength('0'); // 0
 *
 * toLength(NaN); // 0
 *
 * toLength(Infinity); // 4294967295
 *
 * toLength(-Infinity); // 0
 *
 */
function toLength(value: any): number {
  value = toInteger(value);
  if (!value) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH;
  }
  return value;
}

export default toLength;
