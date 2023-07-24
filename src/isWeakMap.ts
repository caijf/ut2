import { checkType } from './internals/checkType';
import { weakMapTag } from './internals/native';

/**
 * 检查值是否为 `WeakMap` 对象。
 *
 * @static
 * @alias module:Language.isWeakMap
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `WeakMap` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isWeakMap(new WeakMap); // true
 *
 * isWeakMap(new Map); // false
 *
 */
function isWeakMap(value: any): value is WeakMap<any, any> {
  return checkType(value, weakMapTag);
}

export default isWeakMap;
