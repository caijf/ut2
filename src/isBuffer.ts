/**
 * 检查值是否为 Buffer 。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于 Node.js 。</em>
 *
 * @static
 * @alias module:Type.isBuffer
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 Buffer
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
