import { numberTag, objectToString } from './internals/native';

/**
 * 检查值是否为数字类型或对象。
 *
 * `Infinity` `-Infinity` `NaN` 都归类为数字。如果要排除，请使用 `isFinite` 方法。
 *
 * @static
 * @alias module:Language.isNumber
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为数字类型或对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isNumber(1); // true
 *
 * isNumber(Infinity); // true
 *
 * isNumber(Number.MIN_VALUE); // true
 *
 * isNumber(NaN); // true
 *
 * isNumber(new Number(1)); // true
 *
 * isNumber('1'); // false
 *
 * isNumber(null); // false
 *
 */
function isNumber(value: any): value is number {
  return typeof value === 'number' || objectToString.call(value) === numberTag;
}

export default isNumber;
