import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为字符串基元或对象。
 *
 * @static
 * @alias module:Type.isString
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为字符串基元或对象
 * @example
 *
 * isString('abc'); // true
 *
 * isString(new String('abc')); // true
 *
 * isString(1); // false
 *
 */
function isString(value: any) {
  return typeof value === 'string' || (isObjectLike(value) && isType(value, 'String'));
}

export default isString;
