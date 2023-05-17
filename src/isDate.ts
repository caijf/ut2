import isType from './internals/isType';
import { nodeIsDate } from './internals/nodeUtil';

/**
 * 检查值是否为日期对象。
 *
 * @static
 * @alias module:Type.isDate
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为日期对象
 * @example
 *
 * isDate(new Date); // true
 *
 * isDate('Mon April 23 2012'); // false
 *
 */
function isDate(value: any) {
  return nodeIsDate ? nodeIsDate(value) : isType(value, 'Date');
}

export default isDate;
