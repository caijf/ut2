import root from './internals/root';
import { numberIsFinite } from './internals/native';

/**
 * 检查值是否为有限数字。
 *
 * 同 `Number.isFinite`。
 *
 * @static
 * @alias module:Language.isFinite
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为有限数字，返回 `true`，否则返回 `false`。
 * @example
 *
 * isFinite(1); // true
 *
 * isFinite(Infinity); // false
 *
 * isFinite(Number.MIN_VALUE); // true
 *
 * isFinite('1'); // false
 *
 * isFinite(null); // false
 *
 */
function isFinite(value: any): value is number {
  return numberIsFinite ? numberIsFinite(value) : typeof value === 'number' && root.isFinite(value);
}

export default isFinite;
