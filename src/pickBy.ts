import allKeysIn from './allKeysIn';
import { stubFlase } from './internals/helpers';
import { ObjectPredicate, WithNullable } from './internals/types';

/**
 * 创建一个对象，该对象的属性从 `object` 中经 `predicate` （断言函数）判断为真值的属性。
 *
 * `predicate` 调用时会传入两个参数 `value` `key`。
 *
 * @alias module:Object.pickBy
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy Truthy}
 * @param {Object} obj 来源对象。
 * @param {Function} [predicate] 调用每一个属性的函数，返回 `Truthy` 表示要提取该属性，否则不提取。
 * @returns {Object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * pickBy(obj); // {}
 *
 * pickBy(obj, (value) => typeof value === 'number'); // { age: 18 }
 *
 * pickBy(obj, (value) => value); // { name: "jeff", age: 18 }
 *
 */
function pickBy<T extends object>(object: WithNullable<T>, predicate: ObjectPredicate<T> = stubFlase) {
  const result: Partial<T> = {};

  const keys = allKeysIn(object) as (keyof T)[];

  keys.forEach((key) => {
    if (predicate(object![key], key)) {
      result[key] = object![key];
    }
  });

  return result;
}

export default pickBy;
