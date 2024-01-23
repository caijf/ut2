import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';
import isArrayLike from './isArrayLike';
import keys from './keys';

function forEach<T>(collection: WithNullable<T[]>, iteratee?: ArrayIterator<T, any>): T[];
function forEach(collection: WithNullable<string>, iteratee?: StringIterator<any>): string;
function forEach<T>(collection: WithNullable<ArrayLike<T>>, iteratee?: ArrayLikeIterator<T, any>): ArrayLike<T>;
function forEach<T extends object>(collection: WithNullable<T>, iteratee?: ObjectIterator<T, any>): T;

/**
 * 迭代集合元素，为每个元素调用 `iteratee` 。
 *
 * `iteratee` 函数可以通过显式返回 `false` 来提前退出迭代。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection` 。
 *
 * @static
 * @alias module:Collection.forEach
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {Function} [iteratee=identity] 每次迭代调用的函数。
 * @returns {ArrayLike<any> | Object} 迭代集合本身。
 * @example
 *
 * forEach([1,2,3], function(item){
 *   console.log(item);
 * });
 * // 1
 * // 2
 * // 3
 *
 * forEach({a: 1, b: 2}, function(value, key){
 *   console.log(value, key);
 * });
 * // 1 'a'
 * // 2 'b'
 *
 */
function forEach(collection: any, iteratee: (item: any, index: any, collection: any) => any = identity) {
  const _keys = !isArrayLike(collection) && keys(collection);
  const len = (_keys || collection).length;
  let i = 0;

  while (i < len) {
    const currentKey = _keys ? _keys[i] : i;
    if (iteratee(collection[currentKey], currentKey, collection) === false) {
      break;
    }
    i++;
  }

  return collection;
}

export default forEach;
