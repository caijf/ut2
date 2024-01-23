import forEach from './forEach';
import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';

function some<T>(collection: WithNullable<T[]>, predicate?: ArrayIterator<T, any>): boolean;
function some(collection: WithNullable<string>, predicate?: StringIterator<any>): boolean;
function some<T>(collection: WithNullable<ArrayLike<T>>, predicate?: ArrayLikeIterator<T, any>): boolean;
function some<T extends object>(collection: WithNullable<T>, predicate?: ObjectIterator<T, any>): boolean;

/**
 * 迭代集合中的元素执行 `predicate` 函数，如果任一元素通过 `predicate` 返回真值，则停止迭代并返回 `true` ，否则返回 `false` 。
 *
 * `predicate` 调用时会传入三个参数 `value` `index|key` `collection` 。
 *
 * @static
 * @alias module:Collection.some
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {function} [predicate=identity] 每次迭代调用的函数。
 * @returns {boolean} 如果任一元素通过 `predicate` 测试，则返回 `true` ，否则返回 `false` 。
 * @example
 *
 * const arr = [1, 2, 3, 4, 5, 6];
 * some(arr, item => item % 2 === 0); // false
 *
 * const obj = { one: 1, two: 2, three: 3 };
 * some(obj, item => item > 1); // true
 */
function some(collection: any, predicate: any = identity) {
  let result = false;
  forEach(collection, (item, index, arr) => {
    if (predicate(item, index, arr)) {
      result = true;
      return false;
    }
  });
  return result;
}

export default some;
