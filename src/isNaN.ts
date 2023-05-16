import isType from './internals/isType';

/**
 * 检查值是否为 NaN 。
 *
 * @static
 * @alias module:Type.isNaN
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 NaN
 * @example
 *
 * isNaN(NaN); // true
 * isNaN(1); // false
 *
 */
function _isNaN(value: any) {
  return isType(value, 'Number') && isNaN(value);
}

export default _isNaN;
