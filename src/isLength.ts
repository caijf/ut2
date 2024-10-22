import { MAX_SAFE_INTEGER } from './internals/native';

/**
 * 检查值是否为有效的类数组长度。
 *
 * @alias module:Language.isLength
 * @since 1.0.0
 * @see {@link https://tc39.es/ecma262/#sec-tolength | ToLength}
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为有效的类数组长度，返回 `true`，否则返回 `false`。
 * @example
 *
 * isLength(3); // true
 *
 * isLength('3'); // false
 *
 * isLength(Number.Min_VALUE); // false
 *
 * isLength(Number.Infinity); // false
 *
 */
function isLength(value: any): value is number {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

export default isLength;
