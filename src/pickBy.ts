import getKeysIn from './internals/getKeysIn';
import getSymbolsIn from './internals/getSymbolsIn';

/**
 * 创建一个对象，该对象的属性由第二个参数断言方法返回 `Truthy` 。
 *
 * 断言方法的两个参数是对象的每个可枚举属性的 `value` `key` 。
 *
 * 仅包含对象可枚举的属性。
 *
 * @static
 * @alias module:Object.pickBy
 * @since 1.0.0
 * @param {object} obj 对象
 * @param {function} predicate 每个属性/值调用函数
 * @returns {object} 新对象
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
