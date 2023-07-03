import isType from './internals/isType';
import { nodeIsDate } from './internals/nodeUtil';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Date` 对象。
 *
 * @static
 * @alias module:Type.isDate
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Date` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isDate(new Date); // true
 *
 * isDate('Mon April 23 2012'); // false
 *
 */
function isDate(value: any): value is Date {
  return nodeIsDate ? nodeIsDate(value) : isObjectLike(value) && isType(value, 'Date');
}

export default isDate;
