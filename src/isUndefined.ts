import { nativeUndefined } from './internals/native';

/**
 * 检查值是否为 `undefined`。
 *
 * @alias module:Language.isUndefined
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `undefined`，返回 `true`，否则返回 `false`。
 * @example
 *
 * isUndefined(undefined); // true
 *
 * isUndefined(null); // false
 *
 */
function isUndefined(value: any): value is undefined {
  return value === nativeUndefined;
}

export default isUndefined;
