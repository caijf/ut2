import forEach from './forEach';
import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';

function filter<T>(collection: WithNullable<T[]>, predicate?: ArrayIterator<T, any>): T[];
function filter(collection: WithNullable<string>, predicate?: StringIterator<any>): string[];
function filter<T>(collection: WithNullable<ArrayLike<T>>, predicate?: ArrayLikeIterator<T, any>): T[];
function filter<T extends object>(collection: WithNullable<T>, predicate?: ObjectIterator<T, any>): Array<T[keyof T]>;

/**
 * 过滤集合元素，为每个元素执行 `predicate` 函数，返回真值的元素将保留在结果数组中（不改变原值）。
 *
 * @static
 * @alias module:Collection.filter
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {function} [predicate=identity] 每次迭代调用的函数。
 * @returns {Array} 返回新的过滤数组。
 * @example
 *
 * const arr = [1, 2, 3, 4, 5, 6];
 * filter(arr, item => item % 2 === 0); // [2, 4, 6]
 *
 * const obj = { one: 1, two: 2, three: 3 };
 * filter(obj, item => item > 1); // [2, 3]
 */
function filter<T>(array: any, predicate: any = identity) {
  const results: T[] = [];
  forEach(array, (item, index) => {
    if (predicate(item, index, array)) {
      results.push(item);
    }
  });
  return results;
}

export default filter;
