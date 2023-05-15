import isType from './internals/isType';

/**
 * 检查值是否为 Arguments 。
 *
 * @static
 * @alias module:Type.isArguments
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Arguments
 * @example
 *
 * isArguments(function() { return arguments }()); // true
 * isArguments([1, 2, 3]); // false
 *
 */
function isArguments(value: any) {
  return isType(value, 'Arguments');
}

export default isArguments;
