import { root } from './internals/native';
import { numberIsFinite } from './internals/helpers';

/**
 * 检查值是否为有限数值。
 *
 * 同 `Number.isFinite` 。
 *
 * @static
 * @alias module:Type.isFinite
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为有限数值，返回 `true` ，否则返回 `false` 。
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
function isFinite(value: any) {
  return numberIsFinite ? numberIsFinite(value) : typeof value === 'number' && root.isFinite(value);
}

export default isFinite;
