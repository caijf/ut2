import { dateTag, objectToString } from './internals/native';
import { nodeIsDate } from './internals/nodeUtil';

/**
 * 检查值是否为 `Date` 对象。
 *
 * @static
 * @alias module:Language.isDate
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
  return nodeIsDate ? nodeIsDate(value) : objectToString.call(value) === dateTag;
}

export default isDate;
