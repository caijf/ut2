// 计数器
let idCounter = 0;

// 默认前缀，避免不同工具库uniqueId之间产生的值冲突
const defaultPrefix = '_' + Math.random().toString(36).substring(2, 4);

/**
 * 生成唯一ID。如果提供了 `prefix` ，会被添加到ID前缀上。
 *
 * @static
 * @alias module:Util.uniqueId
 * @since 1.0.0
 * @param {string} [prefix] 要添加到ID前缀的值，默认 `"_" + 2个随机生成的字符`。
 * @returns {string} 唯一ID。
 * @example
 *
 * uniqueId(); // '_vn1'
 *
 * uniqueId(); // '_vn2'
 *
 * uniqueId('abc_'); // 'abc_3'
 *
 */
function uniqueId(prefix = defaultPrefix) {
  return '' + prefix + ++idCounter;
}

export default uniqueId;
