import { numberIsInteger } from './internals/native';
import isFinite from './isFinite';

/**
 * 检查值是否为整数。
 *
 * 同 `Number.isInteger` 。
 *
 * @static
 * @alias module:Language.isInteger
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为整数，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isInteger(1); // true
 *
 * isInteger(Infinity); // false
 *
 * isInteger(Number.MIN_VALUE); // false
 *
 * isInteger('1'); // false
 *
 * isInteger(null); // false
 *
 */
function isInteger(value: any): value is number {
  return numberIsInteger ? numberIsInteger(value) : isFinite(value) && Math.floor(value) === value;
}

export default isInteger;
