import identity from '../identity';
import isArrayLike from '../isArrayLike';
import keys from '../keys';
import { ArrayIterator, ArrayLikeIterator, ObjectIterator, StringIterator, WithNullable } from './types';

/**
 * 创建迭代集合方法
 *
 * @private
 * @param dir 迭代方向
 * @returns 迭代集合方法
 */
function createForEach(dir: 1 | -1) {
  function forEach<T>(collection: WithNullable<T[]>, iteratee?: ArrayIterator<T, any>): T[];
  function forEach(collection: WithNullable<string>, iteratee?: StringIterator<any>): string;
  function forEach<T>(collection: WithNullable<ArrayLike<T>>, iteratee?: ArrayLikeIterator<T, any>): ArrayLike<T>;
  function forEach<T extends object>(collection: WithNullable<T>, iteratee?: ObjectIterator<T, any>): T;
  function forEach(collection: any, iteratee: any = identity) {
    const _keys = !isArrayLike(collection) && keys(collection);
    const len = (_keys || collection).length;
    let i = dir > 0 ? 0 : len - 1;

    while (i >= 0 && i < len) {
      const currentKey = _keys ? _keys[i] : i;
      if (iteratee(collection[currentKey], currentKey, collection) === false) {
        break;
      }
      i += dir;
    }

    return collection;
  }

  return forEach;
}

export default createForEach;
