/**
 * 检查值是否为 `null`。
 *
 * @alias module:Language.isNull
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `null`，返回 `true`，否则返回 `false`。
 * @example
 *
 * isNull(null); // true
 *
 * isNull(void 0); // false
 *
 */
function isNull(value: any): value is null {
  return value === null;
}

export default isNull;
