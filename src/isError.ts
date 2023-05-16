import isType from './internals/isType';

/**
 * 检查值是否为 Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError|DOMException 。
 *
 * @static
 * @alias module:Type.isError
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError|DOMException
 * @example
 *
 * isError(new Error); // true
 * isError(Error); // false
 *
 */
function isError(value: any) {
  return isType(value, 'Error') || isType(value, 'DOMException');
}

export default isError;
