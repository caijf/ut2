import forEach from './forEach';
import identity from './identity';
import createIteratee from './internals/createIteratee';
import { ArrayLikeIterator, CollectionList, CollectionObject, ObjectIterator, PropertyName } from './internals/types';

interface Partition {
  <T extends object>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, any> | keyof T): [T[], T[]];
  <T>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, any> | PropertyName): [T[], T[]];
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: ObjectIterator<T, any> | keyof T): [V[], V[]];
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: PropertyName): [V[], V[]];
}

/**
 * 创建一个分成两组的元素数组，第一组包含 `predicate`（断言函数）返回为 [`Truthy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)（真值）的元素，第二组包含 `predicate`（断言函数）返回为 [`Falsy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)（假值）的元素。
 *
 * `predicate` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @alias module:Collection.partition
 * @since 1.0.0
 * @requires module:Collection.forEach
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy Truthy}
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy Falsy}
 * @param {ArrayLike<any> | Object} collection 一个用来迭代的集合。
 * @param {Function | string | number | Symbol | Array} [predicate=identity] 每次迭代调用的断言函数。默认 `identity`。
 * @returns {Array} 分组后的数组。
 * @example
 *
 * const users = [
 *   { user: 'barney', age: 36, active: false },
 *   { user: 'fred', age: 40, active: true },
 *   { user: 'pebbles', age: 1, active: false }
 * ];
 *
 * partition(users, item => item.active);
 * // [
 * //   [{ user: 'fred', age: 40, active: true }],
 * //   [{ user: 'barney', age: 36, active: false }, { user: 'pebbles', age: 1, active: false }]
 * // ]
 *
 * // 迭代函数可以直接写入属性。
 * partition(users, 'active');
 * // [
 * //   [{ user: 'fred', age: 40, active: true }],
 * //   [{ user: 'barney', age: 36, active: false }, { user: 'pebbles', age: 1, active: false }]
 * // ]
 *
 */
const partition: Partition = function <T>(collection: any, predicate: any = identity) {
  const result: [T[], T[]] = [[], []];
  const internalIteratee = createIteratee<T>(predicate);
  forEach(collection, (item, index, arr) => {
    result[internalIteratee(item, index, arr) ? 0 : 1].push(item);
  });
  return result;
};

export default partition;
