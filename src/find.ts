import forEach from './forEach';
import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';

interface Find {
  <T>(collection: WithNullable<T[]>, predicate?: ArrayIterator<T, any>): T | undefined;
  (collection: WithNullable<string>, predicate?: StringIterator<any>): string | undefined;
  <T>(collection: WithNullable<ArrayLike<T>>, predicate?: ArrayLikeIterator<T, any>): T | undefined;
  <T extends object>(collection: WithNullable<T>, predicate?: ObjectIterator<T, any>): T[keyof T] | undefined;
}

/**
 * 迭代集合中的元素执行 `predicate` 函数，返回第一个通过 `predicate` 返回真值的元素（停止迭代），如果都不通过返回 `undefined`。
 *
 * `predicate` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @function
 * @alias module:Collection.find
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {function} [predicate=identity] 每次迭代调用的函数。默认 `identity`。
 * @returns {ArrayLike<any> | Object} 返回第一个通过 `predicate` 返回真值的元素，否则返回 `undefined`。
 * @example
 *
 * const arr = [1, 2, 3, 4, 5, 6];
 * find(arr, item => item % 2 === 0); // 2
 *
 * const obj = { one: 1, two: 2, three: 3 };
 * find(obj, item => item > 1); // 2
 */
const find: Find = function (collection: any, predicate: any = identity) {
  let result: any;
  forEach(collection, (item, index, arr) => {
    if (predicate(item, index, arr)) {
      result = item;
      return false;
    }
  });
  return result;
};

export default find;
