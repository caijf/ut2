/**
 * 检查值是否为 Undefined 。
 *
 * @static
 * @alias module:Type.isUndefined
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为 Undefined
 * @example
 *
 * isUndefined(undefined); // true
 * isUndefined(void 0); // true
 * isUndefined(null); // false
 *
 */
function isUndefined(value: any) {
  return value === void 0;
}

export default isUndefined;
