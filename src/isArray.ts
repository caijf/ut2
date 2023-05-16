/**
 * 检查值是否为数组对象。
 *
 * @static
 * @alias module:Type.isArray
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为数组对象
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
function isArray(value: any) {
  return Array.isArray(value);
}

export default isArray;
