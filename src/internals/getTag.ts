import { objectProtoToString } from './native';

/**
 * 获取值的 `Object.prototype.toString` 。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function getTag(value: any) {
  return objectProtoToString.call(value);
}

export default getTag;
