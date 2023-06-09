import createIteratee from './internals/createIteratee';
import isArray from './isArray';

/**
 * 创建一个组成对象， `key` 是经过 `iteratee` 执行处理 `collection` 中每个元素后返回的结果，每个 `key` 对应的值是 `iteratee` 返回该 `key` 的次数。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Collection.countBy
 * @since 1.0.0
 * @param {Array} collection 一个用来迭代的集合。
 * @param {Function | string} [iteratee] 迭代函数，用来转换键。
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
function countBy<T, F extends (value: T) => any, K extends keyof T>(collection: T[], iteratee?: F | K) {
  const result: Record<string | number | symbol, number> = {};

  if (isArray(collection)) {
    const internalIteratee = createIteratee<T, F, K>(iteratee);
    collection.forEach((item) => {
      const key = internalIteratee(item);
      if (key in result) {
        ++result[key];
      } else {
        result[key] = 1;
      }
    });
  }
  return result;
}

export default countBy;
