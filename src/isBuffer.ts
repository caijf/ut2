/**
 * 检查值是否为 `buffer` 。
 *
 * 非 Node.js 环境，始终返回 `false` 。
 *
 * @static
 * @alias module:Language.isBuffer
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 如果值为 `buffer` ，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isBuffer(new Buffer(2)); // true
 *
 * isBuffer({}); // false
 *
 * isBuffer('2012'); // false
 *
 */
function isBuffer(value: any): value is Buffer {
  if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function') {
    return Buffer.isBuffer(value);
  }
  return false;
}

export default isBuffer;
