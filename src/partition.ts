import forEach from './forEach';
import createIteratee from './internals/createIteratee';
import { CollectionList, CollectionObject, IterateeParam } from './internals/types';

function partition<T>(collection: CollectionList<T>, iteratee?: IterateeParam<T>): [T[], T[]];
function partition<T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: IterateeParam<V>): [V[], V[]];

/**
 * 创建一个分成两组的元素数组，第一组包含 `predicate`（断言函数）返回为 [`truthy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)（真值）的元素，第二组包含 `predicate`（断言函数）返回为 [`falsy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)（假值）的元素。
 *
 * `predicate` 调用时会传入 1 个参数 `value`。
 *
 * @static
 * @alias module:Collection.partition
 * @since 1.0.0
 * @param {ArrayLike<any> | Object} collection 一个用来迭代的集合。
 * @param {Function | string} [predicate=identity] 每次迭代调用的断言函数。
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
function partition<T>(collection: any, predicate?: any) {
  const result: [T[], T[]] = [[], []];
  const internalIteratee = createIteratee<T>(predicate);
  forEach(collection, (item) => {
    result[internalIteratee(item) ? 0 : 1].push(item);
  });
  return result;
}

export default partition;
