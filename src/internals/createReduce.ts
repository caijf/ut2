import identity from '../identity';
import isArrayLike from '../isArrayLike';
import keys from '../keys';
import { FunctionAny, ReduceArrayIterator, ReduceArrayLikeIterator, ReduceObjectIterator, ReduceStringIterator, WithNullable } from './types';

/**
 * 创建 reducer 函数
 *
 * @private
 * @param dir 迭代方向
 * @returns reduce 方法
 */
function createReduce(dir: 1 | -1) {
  function reducer(collection: any, iteratee: FunctionAny, memo: any, initial: boolean) {
    const _keys = !isArrayLike(collection) && keys(collection);
    const len = (_keys || collection).length;
    let i = dir > 0 ? 0 : len - 1;

    if (!initial && len > 0) {
      memo = collection[_keys ? _keys[i] : i];
      i += dir;
    }

    while (i >= 0 && i < len) {
      const currentKey = _keys ? _keys[i] : i;
      memo = iteratee(memo, collection[currentKey], currentKey, collection);
      i += dir;
    }
    return memo;
  }

  function reduce<T, R>(collection: WithNullable<T[]>, iteratee: ReduceArrayIterator<T, R>, initialValue: R): R;
  function reduce<R>(collection: WithNullable<string>, iteratee: ReduceStringIterator<R>, initialValue: R): R;
  function reduce<T, R>(collection: WithNullable<ArrayLike<T>>, iteratee: ReduceArrayLikeIterator<T, R>, initialValue: R): R;
  function reduce<T extends object, R>(collection: WithNullable<T>, iteratee: ReduceObjectIterator<T, R>, initialValue: R): R;

  function reduce<T>(collection: WithNullable<T[]>, iteratee?: ReduceArrayIterator<T, T>): T | undefined;
  function reduce(collection: WithNullable<string>, iteratee?: ReduceStringIterator<string>): string | undefined;
  function reduce<T>(collection: WithNullable<ArrayLike<T>>, iteratee?: ReduceArrayLikeIterator<T, T>): T | undefined;
  function reduce<T extends object>(collection: WithNullable<T>, iteratee?: ReduceObjectIterator<T, T[keyof T]>): T[keyof T] | undefined;
  function reduce(collection: any, iteratee: FunctionAny = identity, initialValue?: any) {
    const initial = arguments.length >= 3;
    return reducer(collection, iteratee, initialValue, initial);
  }
  return reduce;
}

export default createReduce;
