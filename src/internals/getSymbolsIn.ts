import getSymbols from './getSymbols';

/**
 * 创建一个数组，包含自身以及继承的可枚举 `symbol` 属性。
 *
 * @private
 * @param {Object} object 要查询的对象
 * @returns {Symbol[]} 可枚举的 `symbol` 属性数组
 */
function getSymbolsIn(object: object) {
  const result = [];

  let o = Object(object);

  while (o) {
    result.push(...getSymbols(o));
    o = Object.getPrototypeOf(o);
  }

  return result;
}

export default getSymbolsIn;
