import { argumentsTag, objectProtoHasOwnProperty, objectProtoToString, objectProtoPropertyIsEnumerable } from './internals/native';
import { supportedArgumentsType } from './internals/helpers';
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
function isArguments(value: any): value is IArguments {
  if (supportedArgumentsType) {
    return objectProtoToString.call(value) === argumentsTag;
  }
  return isObjectLike(value) && objectProtoHasOwnProperty.call(value, 'callee') && !objectProtoPropertyIsEnumerable.call(value, 'callee');
}

export default isArguments;
