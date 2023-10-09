import { objectGetOwnPropertySymbols, objectProtoPropertyIsEnumerable } from './native';

/**
 * 创建一个数组，包含自身的可枚举 `symbol` 属性。
 *
 * @private
 * @param {Object} object 要查询的对象
 * @returns {Symbol[]} 自身可枚举的 `symbol` 属性数组
 */
function getSymbols(object: object) {
  if (!objectGetOwnPropertySymbols || object === null) {
    return [];
  }

  return objectGetOwnPropertySymbols(object).filter((item) => objectProtoPropertyIsEnumerable.call(object, item));
}

export default getSymbols;
