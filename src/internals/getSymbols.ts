import { objectGetOwnPropertySymbols } from './helpers';
import { propertyIsEnumerable } from './native';

/**
 * 创建一个数组，包含自身的可枚举 `symbol` 属性。
 *
 * @param {object} obj 要查询的对象
 * @returns {symbol[]} 自身可枚举的 `symbol` 属性数组
 */
function getSymbols(obj: object) {
  if (!objectGetOwnPropertySymbols || obj === null) {
    return [];
  }

  return objectGetOwnPropertySymbols(obj).filter((item) => propertyIsEnumerable.call(obj, item));
}

export default getSymbols;
