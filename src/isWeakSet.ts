import getTag from './internals/getTag';
import { weakSetTag } from './internals/native';

/**
 * 检查值是否为 `WeakSet` 对象。
 *
 * @alias module:Language.isWeakSet
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `WeakSet` 对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isWeakSet(new WeakSet); // true
 *
 * isWeakSet(new Set); // false
 *
 */
function isWeakSet(value: any): value is WeakSet<object> {
  return getTag(value) === weakSetTag;
}

export default isWeakSet;
