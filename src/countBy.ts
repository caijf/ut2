import forEach from './forEach';
import createIteratee from './internals/createIteratee';
import { ArrayLikeIterator, CollectionList, CollectionObject, ObjectIterator, PropertyName } from './internals/types';

interface CountBy {
  <T extends object>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, PropertyName> | keyof T): Record<PropertyName, number>;
  <T>(collection: CollectionList<T>, iteratee?: ArrayLikeIterator<T, PropertyName> | PropertyName): Record<PropertyName, number>;
  <T extends object>(collection: CollectionObject<T>, iteratee?: ObjectIterator<T, PropertyName> | keyof T): Record<PropertyName, number>;
  <T extends object>(collection: CollectionObject<T>, iteratee?: PropertyName): Record<PropertyName, number>;
}

/**
 * 创建一个组成对象， `key` 是经过 `iteratee` 执行处理 `collection` 中每个元素后返回的结果，每个 `key` 对应的值是 `iteratee` 返回该 `key` 的次数。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection` 。
 *
 * @function
 * @alias module:Collection.countBy
 * @since 1.0.0
 * @param {ArrayLike<any> | object} collection 一个用来迭代的集合。
 * @param {Function | string | number | Symbol} [iteratee=identity] 迭代函数，用来转换键。
 * @returns {Object} 组成集合对象。
 * @example
 *
 * countBy([6, 4, 6]); // {'6': 2, '4': 1}
 *
 * countBy([6.1, 4.2, 6.3], Math.floor); // {'6': 2, '4': 1}
 *
 * countBy([{n: 6.1}, {n: 4.2}, {n: 6.3}], item=>Math.floor(item.n)); // {'6': 2, '4': 1}
 *
 * // 迭代函数可以直接写入属性。
 * countBy(['one', 'two', 'three'], 'length'); // {'3': 2, '5': 1}
 *
 */
const countBy: CountBy = function <T>(collection: any, iteratee?: any) {
  const result: Record<PropertyName, number> = {};
  const internalIteratee = createIteratee<T>(iteratee);
  forEach(collection, (item, index, arr) => {
    const key = internalIteratee(item, index, arr);
    if (key in result) {
      ++result[key];
    } else {
      result[key] = 1;
    }
  });
  return result;
};

export default countBy;
