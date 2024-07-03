import forEach from './forEach';
import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';

interface Filter {
  <T>(collection: WithNullable<T[]>, predicate?: ArrayIterator<T, any>): T[];
  (collection: WithNullable<string>, predicate?: StringIterator<any>): string[];
  <T>(collection: WithNullable<ArrayLike<T>>, predicate?: ArrayLikeIterator<T, any>): T[];
  <T extends object>(collection: WithNullable<T>, predicate?: ObjectIterator<T, any>): Array<T[keyof T]>;
}

/**
 * 过滤集合元素，为每个元素执行 `predicate` 函数，返回真值的元素将保留在结果数组中（不改变原值）。
 *
 * `predicate` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @static
 * @alias module:Collection.filter
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {function} [predicate=identity] 每次迭代调用的函数。默认 `identity`。
 * @returns {Array} 返回新的过滤数组。
 * @example
 *
 * const arr = [1, 2, 3, 4, 5, 6];
 * filter(arr, item => item % 2 === 0); // [2, 4, 6]
 *
 * const obj = { one: 1, two: 2, three: 3 };
 * filter(obj, item => item > 1); // [2, 3]
 */
const filter: Filter = function <T>(array: any, predicate: any = identity) {
  const results: T[] = [];
  forEach(array, (item, index) => {
    if (predicate(item, index, array)) {
      results.push(item);
    }
  });
  return results;
};

export default filter;
