import getTag from './internals/getTag';
import { booleanTag } from './internals/native';

/**
 * 检查值是否为布尔类型或对象。
 *
 * @alias module:Language.isBoolean
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为布尔类型或对象，返回 `true` 否则返回 `false`。
 * @example
 *
 * isBoolean(false); // true
 *
 * isBoolean(new Boolean(false)); // true
 *
 * isBoolean(Object(false)); // true
 *
 * isBoolean(new Boolean(false)); // true
 *
 * isBoolean(null); // false
 *
 */
function isBoolean(value: any): value is boolean {
  return value === true || value === false || getTag(value) === booleanTag;
}

export default isBoolean;
