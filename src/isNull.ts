/**
 * 检查值是否为 `null` 。
 *
 * @static
 * @alias module:Type.isNull
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `null`
 * @example
 *
 * isNull(null); // true
 *
 * isNull(void 0); // false
 *
 */
function isNull(value: any) {
  return value === null;
}

export default isNull;
