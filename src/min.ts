import identity from './identity';
import createExtremum from './internals/createExtremum';
import lt from './lt';

/**
 * 调用 `array` 中的每一个元素，来生成其值排序的标准，返回最小的值。
 *
 * `iteratee` 调用时会传入 1 个参数 `value`。
 *
 * @static
 * @alias module:Math.min
 * @since 1.0.0
 * @param {Array} array 要迭代的数组。
 * @param {Function | string} [iteratee=identity] 调用每个元素的迭代函数。
 * @returns {*} 最小的值。
 * @example
 *
 * const array = [1, 2, 3];
 *
 * min(array); // 1
 *
 * const objects = [{n: 1}, {n: 2}];
 *
 * min(objects, item => item.n); // {n: 1}
 *
 * // 迭代函数可以直接写入属性。
 * min(objects, 'n'); // {n: 1};
 */
function min<T, F extends (item: T) => any, K extends keyof T>(
  array: T[],
  iteratee: F | K = identity as any
) {
  return createExtremum(array, iteratee, lt);
}

export default min;
