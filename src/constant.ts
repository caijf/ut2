/**
 * 创建一个返回 `value` 的函数。
 *
 * @static
 * @alias module:Util.constant
 * @since 1.0.0
 * @param {*} value 新函数返回的值。
 * @returns {function} 返回新的常量函数。
 * @example
 *
 * const obj = { a: 1 }
 *
 * const returnObj = constant(obj);
 *
 * console.log(returnObj() === obj); // true
 */
function constant<T>(value: T) {
  return function () {
    return value;
  };
}

export default constant;
