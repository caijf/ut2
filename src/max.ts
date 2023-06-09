import gt from './gt';
import identity from './identity';
import createExtremum from './internals/createExtremum';

/**
 * 调用 `array` 中的每一个元素，来生成其值排序的标准，返回最大的值。
 *
 * @static
 * @alias module:Math.max
 * @since 1.0.0
 * @param {Array} array 要迭代的数组。
 * @param {Function | string} [iteratee=identity] 调用每个元素的迭代函数。
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
function max<T, F extends (item: T) => any, K extends keyof T>(
  array: T[],
  iteratee: F | K = identity as any
) {
  return createExtremum(array, iteratee, gt);
}

export default max;
