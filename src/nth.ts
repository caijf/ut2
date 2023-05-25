import { arrayAt } from './internals/helpers';
import isArrayLike from './isArrayLike';

/**
 * 获取数组的第 `n` 个元素。如果 `n` 为负数，则返回从数组结尾开始的第 `n` 个元素。
 *
 * 同 `Array.prototype.at` 方法。
 *
 * @static
 * @alias module:Array.nth
 * @since 1.0.0
 * @param {Array} array 要查询的数组。
 * @param {number} [n=0] 要返回元素的索引值。
 * @returns {*} 数组的第 `n` 个元素。
 * @example
 *
 * const arr = ['a', 'b', 'c', 'd'];
 *
 * nth(arr, 1); // 'b'
 *
 * nth(arr, -2); // 'c'
 *
 */
function nth<T = any>(array: T[], n = 0): T {
  if (!isArrayLike(array)) {
    return undefined as any;
  }

  if (typeof arrayAt === 'function') {
    return arrayAt.call(array, n);
  }
  const index = n < 0 ? n + array.length : n;
  return array[index];
}

export default nth;
