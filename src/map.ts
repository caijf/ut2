import forEach from './forEach';
import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';

interface Map {
  <T>(collection: WithNullable<T[]>, iteratee?: ArrayIterator<T, any>): T[];
  (collection: WithNullable<string>, iteratee?: StringIterator<any>): string[];
  <T>(collection: WithNullable<ArrayLike<T>>, iteratee?: ArrayLikeIterator<T, any>): T[];
  <T extends object>(collection: WithNullable<T>, iteratee?: ObjectIterator<T, any>): Array<T[keyof T]>;
}

/**
 * 创建一个新数组，这个数组的值由迭代集合每个元素调用 `iteratee` 函数的返回值组成。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @alias module:Collection.map
 * @since 1.7.0
 * @requires module:Collection.forEach
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {function} [iteratee=identity] 每次迭代调用的函数。默认 `identity`。
 * @returns {Array} 一个新数组。
 * @example
 *
 * const arr = [1, 2, 3];
 * map(arr, item => item * 3); // [3, 6, 9]
 *
 * const obj = { one: 1, two: 2, three: 3 };
 * map(obj, item => item * 3); // [3, 6, 9]
 *
 * map([[1, 2], [3, 4]], item=>item[0]); // [1, 3]
 */
const map: Map = function (collection: any, iteratee: any = identity) {
  const result: any[] = [];
  forEach(collection, (item, index, arr) => {
    result.push(iteratee(item, index, arr));
  });
  return result;
};

export default map;
