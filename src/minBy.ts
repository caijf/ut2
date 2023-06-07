import identity from './identity';
import { lt } from './internals/comparator';
import createExtremum from './internals/createExtremum';

/**
 * 调用 `array` 中的每一个元素，来生成其值排序的标准，返回最小的值。
 *
 * @static
 * @alias module:Math.minBy
 * @since 1.0.0
 * @param {Array} array 要迭代的数组。
 * @param {Function | string} [iteratee=identity] 调用每个元素的迭代函数。
 * @returns {*} 最小的值。
 * @example
 *
 * const array = [1, 2, 3];
 *
 * minBy(array); // 1
 *
 * const objects = [{n: 1}, {n: 2}];
 *
 * minBy(objects, item => item.n); // {n: 1}
 *
 * // 如果迭代元素为对象，迭代函数可以直接写入对象属性。
 * minBy(objects, 'n'); // {n: 1};
 */
function minBy<T, F extends (item: T) => any, K extends keyof T>(
  array: T[],
  iteratee: F | K = identity as any
) {
  return createExtremum(array, iteratee, lt);
}

export default minBy;
