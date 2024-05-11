import { baseGt } from './internals/comparator';
import createExtremum from './internals/createExtremum';
import { ExtremumFunction, IterateeParam, WithNullable } from './internals/types';

/**
 * 调用 `array` 中的每一个元素，来生成其值排序的标准，返回最大的值。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index` `array` 。
 *
 * @function
 * @alias module:Math.max
 * @since 1.0.0
 * @param {Array} array 要迭代的数组。
 * @param {Function | string | number | Symbol} [iteratee] 调用每个元素的迭代函数。
 * @returns {*} 最大的值。
 * @example
 *
 * const array = [1, 2, 3];
 *
 * max(array); // 3
 *
 * const objects = [{n: 1}, {n: 2}];
 *
 * max(objects, item => item.n); // {n: 2}
 *
 * // 迭代函数可以直接写入属性。
 * max(objects, 'n'); // {n: 2};
 *
 */
const max: ExtremumFunction = function <T>(array: WithNullable<T[]>, iteratee?: IterateeParam<T>) {
  return createExtremum(array, baseGt, iteratee);
};

export default max;
