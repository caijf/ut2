import getSymbols from './getSymbols';
import { objectGetPrototypeOf } from './native';

/**
 * 创建一个数组，包含自身以及继承的可枚举 `symbol` 属性。
 *
 * @private
 * @param {Object} object 要查询的对象
 * @returns {Symbol[]} 可枚举的 `symbol` 属性数组
 */
function getSymbolsIn(object: object) {
  const result: symbol[] = [];

  let o = Object(object);

  while (o) {
    getSymbols(o).forEach((item) => {
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    });
    o = objectGetPrototypeOf(o);
  }

  return result;
}

export default getSymbolsIn;
