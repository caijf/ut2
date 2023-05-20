/**
 * 检查值是否为 `undefined` 。
 *
 * @static
 * @alias module:Type.isUndefined
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `undefined`
 * @example
 *
 * isUndefined(undefined); // true
 *
 * isUndefined(null); // false
 *
 */
function isUndefined(value: any) {
  return value === void 0;
}

export default isUndefined;
