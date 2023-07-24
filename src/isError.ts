import { checkTypes } from './internals/checkType';
import { domExceptionTag, errorTag } from './internals/native';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Error` 或 `DOMException` 。
 *
 * 继承自 `Error` 的对象，如 `EvalError` `RangeError` `ReferenceError` `SyntaxError` `TypeError` `URIError` `AggregateError`，都将返回 `true` 。
 *
 * @static
 * @alias module:Language.isError
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Error` 或 `DOMException` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isError(new Error); // true
 *
 * isError(Error); // false
 *
 */
function isError(value: any) {
  return isObjectLike(value) && (value instanceof Error || checkTypes(value, [errorTag, domExceptionTag]));
}

export default isError;
