/**
 * 检查值是否为 `Buffer` 。
 *
 * 非 Node.js 环境，始终返回 `false` 。
 *
 * @static
 * @alias module:Type.isBuffer
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `Buffer`
 * @example
 *
 * isBuffer(new Blob(['a'])); // true
 *
 * isBuffer({}); // false
 *
 * isBuffer('2012'); // false
 *
 */
function isBuffer(value: any) {
  if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function') {
    return Buffer.isBuffer(value);
  }
  return false;
}

export default isBuffer;
