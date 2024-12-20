import getTag from './internals/getTag';
import { stringTag } from './internals/native';

/**
 * 检查值是否为字符串类型或对象。
 *
 * @alias module:Language.isString
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为字符串类型或对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isString('abc'); // true
 *
 * isString(new String('abc')); // true
 *
 * isString(1); // false
 *
 */
function isString(value: any): value is string {
  return typeof value === 'string' || getTag(value) === stringTag;
}

export default isString;
