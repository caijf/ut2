import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Error` 或 `DOMException` 。
 *
 * 继承自 `Error` 的对象，如 `EvalError` `RangeError` `ReferenceError` `SyntaxError` `TypeError` `URIError` `AggregateError`，都将返回 `true` 。
 *
 * @static
 * @alias module:Type.isError
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `Error` 或 `DOMException`
 * @example
 *
 * isError(new Error); // true
 *
 * isError(Error); // false
 *
 */
function isError(value: any) {
  if (!isObjectLike(value)) {
    return false;
  }
  return value instanceof Error || isType(value, 'Error') || isType(value, 'DOMException');
}

export default isError;
