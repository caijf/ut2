import { root } from './internals/native';

/**
 * 检查值是否为有穷数。
 *
 * 同 `Number.isFinite` 。
 *
 * @static
 * @alias module:Type.isFinite
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为有穷数
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
  return typeof value === 'number' && root.isFinite(value);
}

export default isFinite;
