/**
 * 检查值是否为 `undefined` 或 `null` 。
 *
 * @static
 * @alias module:Type.isNil
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `undefined` 或 `null` ，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isNil(undefined); // true
 *
 * isNil(void 0); // true
 *
 * isNil(null); // true
 *
 * isNil(''); // false
 *
 * isNil('a'); // false
 *
 * isNil(1); // false
 */
function isNil(value: any) {
  return value == null;
}

export default isNil;
