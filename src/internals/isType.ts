import getTag from './getTag';

/**
 * 检测值的 `Object.prototype.toString` 类型。
 *
 * @private
 * @since 1.0.0
 * @param {*} value 检查值
 * @param {string} type 类型名称
 * @returns {boolean} 返回值类型是否匹配
 */
function isType(value: any, type: string) {
  const nativeTypeString = getTag(value);
  return nativeTypeString === '[object ' + type + ']';
}

export default isType;
