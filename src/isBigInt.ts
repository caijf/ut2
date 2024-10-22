import getTag from './internals/getTag';
import { bigIntTag } from './internals/native';

/**
 * 检查值是否为 bigint 类型或对象。
 *
 * @alias module:Language.isBigInt
 * @since 1.8.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 bigint 类型或对象，返回 `true` 否则返回 `false`。
 * @example
 *
 * isBigInt(0n); // true
 *
 * isBigInt(1n); // true
 *
 * isBigInt(BigInt(1)); // true
 *
 * isBigInt(Object(1n)); // true
 *
 * isBigInt(1); // false
 */
function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint' || getTag(value) === bigIntTag;
}

export default isBigInt;
