import getKeysIn from './internals/getKeysIn';
import getSymbolsIn from './internals/getSymbolsIn';

/**
 * 创建一个对象，该对象的属性从 `object` 中经 `predicate` （断言函数）判断为真值的属性。
 *
 * `predicate` 调用 2 个参数 `value` `key` 。
 *
 * @static
 * @alias module:Object.pickBy
 * @since 1.0.0
 * @param {object} obj 来源对象。
 * @param {function} predicate 调用每一个属性的函数。
 * @returns {object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * pickBy(obj); // {}
 *
 * pickBy(obj, (value, key) => typeof value === 'number'); // { age: 18 }
 *
 * pickBy(obj, (value, key) => value); // { name: "jeff", age: 18 }
 *
 */
function pickBy<T extends object>(obj: T, predicate: (value: any, key: any) => any = () => false) {
  const result: Partial<T> = {};

  if (obj === null) {
    return result;
  }

  const allKeys = [...getKeysIn(obj), ...getSymbolsIn(obj)] as (keyof T)[];

  for (let i = 0; i < allKeys.length; i++) {
    const currentKey = allKeys[i];
    if (predicate(obj[currentKey], currentKey)) {
      result[currentKey] = obj[currentKey];
    }
  }

  return result;
}

export default pickBy;
