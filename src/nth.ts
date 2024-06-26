import { nativeUndefined } from './internals/native';
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
    return nativeUndefined as any;
  }

  n += n < 0 ? array.length : 0;
  return array[n];
}

export default nth;
