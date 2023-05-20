import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为数字基元或对象。
 *
 * `Infinity` `-Infinity` `NaN` 都归类为数字。如果要排除，请使用 `isFinite` 方法。
 *
 * @static
 * @alias module:Type.isNumber
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为数字基元或对象
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
function isNumber(value: any) {
  return typeof value === 'number' || (isObjectLike(value) && isType(value, 'Number'));
}

export default isNumber;
