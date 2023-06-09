import eq from './eq';
import createIteratee from './internals/createIteratee';
import isArray from './isArray';

/**
 * 创建一个去重后的数组副本。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。只有第一次出现的元素才会被保留。如果传入迭代函数，会调用数组的每个元素以产生唯一性计算的标准。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Array.uniq
 * @since 1.0.0
 * @param {Array}  array 要检查的数组。
 * @param {Function | string} [iteratee] 迭代函数，调用每个元素。
 * @returns {Array} 去重后的新数组。
 * @example
 *
 * uniq([2, 1, 2]); // [2, 1]
 *
 * uniq(['a', NaN, 2, 1, NaN, 'a', 1]); // ['a', NaN, 2, 1]
 *
 * uniq([{x: 1}, {x: 2}, {x: 1}], item=>item.x); // [{x: 1}, {x: 2}]
 *
 * // 如果迭代元素为对象，迭代函数可以直接写入对象属性。
 * uniq([{x: 1}, {x: 2}, {x: 1}], 'x'); // [{x: 1}, {x: 2}]
 *
 */
function uniq<T, F extends (value: T) => any, K extends keyof T>(array: T[], iteratee?: F | K) {
  if (!isArray(array)) {
    return [];
  }

  const internalIteratee = createIteratee<T, F, K>(iteratee);
  return array.filter((value, index, arr) => {
    const current = internalIteratee(value);
    return arr.findIndex((item) => eq(internalIteratee(item), current)) === index;
  });
}

export default uniq;