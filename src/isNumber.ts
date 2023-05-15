import isType from './internals/isType';

/**
 * 检查值是否为 Number 。
 *
 * @static
 * @alias module:Type.isNumber
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为 Number
 * @example
 *
 * isNumber(1); // true
 * isNumber(Number.MIN_VALUE); // true
 * isNumber(Infinity); // true
 * isNumber(NaN); // true
 * isNumber('1'); // false
 *
 */
function isNumber(value: any) {
  return isType(value, 'Number');
}

export default isNumber;
