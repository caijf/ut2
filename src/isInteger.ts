import isFinite from './isFinite';

/**
 * 检查值是否为整数。
 *
 * 同 `Number.isInteger` 。
 *
 * @static
 * @alias module:Type.isInteger
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为整数
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
function isInteger(value: any) {
  return isFinite(value) && Math.floor(value) === value;
}

export default isInteger;
