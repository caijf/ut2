// 计数器
let idCounter = 0;

/**
 * 生成唯一ID。如果提供了 `prefix` ，会被添加到ID前缀上。
 *
 * @static
 * @alias module:Util.uniqueId
 * @since 1.0.0
 * @param {string} [prefix] 要添加到ID前缀的值。
 * @returns {string} 唯一ID。
 * @example
 *
 * uniqueId(); // '1'
 *
 * uniqueId(); // '2'
 *
 * uniqueId('abc_'); // 'abc_3'
 *
 */
function uniqueId(prefix = '') {
  const id = ++idCounter;
  return String(prefix) + id;
}

export default uniqueId;
