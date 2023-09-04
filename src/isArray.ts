/**
 * 检查值是否为 `Array` 对象。
 *
 * @static
 * @alias module:Language.isArray
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 如果值为 `Array` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isArray([1, 2, 3]); // true
 *
 * isArray(document.body.children); // true
 *
 * isArray('abc'); // false
 *
 * isArray(1); // false
 *
 * isArray(()=>{}); // false
 *
 */
function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

export default isArray;
