/**
 * 如果值不是数组，则将其转换为数组
 *
 * @static
 * @alias module:Util.castArray
 * @since 1.0.0
 * @param {*} [value] 要检查的值
 * @returns {Array} 转换数组
 */
function castArray(value?: any) {
  if (!arguments.length) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export default castArray;
