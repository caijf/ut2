import identity from './identity';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './internals/types';
import isArrayLike from './isArrayLike';
import keys from './keys';

function forEach<T>(collection: T[], iteratee?: ArrayIterator<T, any>): T[];
function forEach(collection: string, iteratee?: StringIterator<any>): string;
function forEach<T>(collection: ArrayLike<T>, iteratee?: ArrayLikeIterator<T, any>): ArrayLike<T>;
function forEach<T extends object>(collection: T, iteratee?: ObjectIterator<T, any>): T;
function forEach<T, TArray extends WithNullable<T[]>>(collection: TArray & WithNullable<T[]>, iteratee?: ArrayIterator<T, any>): TArray;
function forEach<TString extends WithNullable<string>>(collection: TString, iteratee?: StringIterator<any>): TString;
function forEach<T, TArrayLike extends WithNullable<ArrayLike<T>>>(collection: TArrayLike & WithNullable<ArrayLike<T>>, iteratee?: ArrayLikeIterator<T, any>): TArrayLike;
function forEach<T extends object>(collection: WithNullable<T>, iteratee?: ObjectIterator<T, any>): WithNullable<T>;

/**
 * 迭代集合的元素并为每个元素调用 `iteratee` 。
 *
 * `iteratee` 函数可以通过显式返回 `false` 来提前退出迭代。
 *
 * @static
 * @alias module:Collection.forEach
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {Function} [iteratee] 每次迭代调用的函数。
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
  let i = -1;
  let len: number;

  if (isArrayLike(collection)) {
    len = collection.length;
    while (++i < len) {
      if (iteratee(collection[i], i, collection) === false) {
        break;
      }
    }
  } else {
    const _keys = keys(collection as object);
    len = _keys.length;
    while (++i < len) {
      if (iteratee((collection as any)[_keys[i]], _keys[i], collection) === false) {
        break;
      }
    }
  }

  return collection;
}

export default forEach;
