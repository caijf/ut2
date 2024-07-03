import getTagWithBugfix from './internals/getTagWithBugfix';
import { weakMapTag } from './internals/native';

/**
 * 检查值是否为 `WeakMap` 对象。
 *
 * @static
 * @alias module:Language.isWeakMap
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `WeakMap` 对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isWeakMap(new WeakMap); // true
 *
 * isWeakMap(new Map); // false
 *
 */
function isWeakMap(value: any): value is WeakMap<object, any> {
  return getTagWithBugfix(value) === weakMapTag;
}

export default isWeakMap;
