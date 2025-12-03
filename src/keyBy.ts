import forEach from './forEach';
import identity from './identity';
import createIteratee from './internals/createIteratee';
import { ArrayLikeIterator, CollectionList, CollectionObject, ObjectIterator, PropertyName } from './internals/types';

interface KeyBy {
  <T extends object>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, PropertyName> | keyof T): Record<PropertyName, T>;
  <T>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, PropertyName> | PropertyName): Record<PropertyName, T>;
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: ObjectIterator<T, PropertyName> | keyof T): Record<PropertyName, V>;
  <T extends object, V extends T[keyof T]>(collection: CollectionObject<T>, iteratee?: PropertyName): Record<PropertyName, V>;
}

/**
 * 创建一个组成聚合对象， `key` 是经过 `iteratee` 执行处理 `collection` 中每个元素后返回的结果。每个 `key` 对应的值是生成 `key` 的最后一个元素。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @function
 * @alias module:Collection.keyBy
 * @since 1.0.0
 * @requires module:Collection.forEach
 * @param {ArrayLike<any> | Object} collection 一个用来迭代的集合。
 * @param {Function | string | number | Symbol} [iteratee=identity] 迭代函数，用来转换键。默认 `identity`。
 * @returns {Object} 组成聚合对象。
 * @example
 *
 * keyBy([6, 4, 6]); // {'6': 6, '4': 4}
 *
 * keyBy([6.1, 4.2, 6.3], Math.floor); // {'6': 6.3, '4': 4.2}
 *
 * keyBy([{n: 6.1}, {n: 4.2}, {n: 6.3}], item=>Math.floor(item.n)); // {'6': {n: 6.3}, '4': {n: 4.2}}
 *
 * // 迭代函数可以直接写入属性。
 * keyBy(['one', 'two', 'three'], 'length'); // {'3': 'two', '5': 'three'}
 *
 */
const keyBy: KeyBy = function <T>(collection: any, iteratee: any = identity) {
  const result: Record<PropertyName, T> = {};

  const internalIteratee = createIteratee<T>(iteratee);
  forEach(collection, (item, index, arr) => {
    const key = internalIteratee(item, index, arr);
    result[key] = item;
  });
  return result;
};

export default keyBy;
