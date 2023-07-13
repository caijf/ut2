import isType from './internals/isType';
import { hasOwnProperty, propertyIsEnumerable } from './internals/native';
import { supportedArgumentsType, argType } from './internals/helpers';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `arguments` 对象。
 *
 * @static
 * @alias module:Language.isArguments
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `arguments` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isArguments(function() { return arguments }()); // true
 *
 * isArguments([1, 2, 3]); // false
 *
 */
function isArguments(value: any) {
  if (supportedArgumentsType) {
    return isObjectLike(value) && isType(value, argType);
  }
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

export default isArguments;
