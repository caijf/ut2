import { nativeUndefined } from './internals/native';
import isArrayLike from './isArrayLike';

interface Nth {
  (array: [], n?: number): undefined;
  <T>(array: ArrayLike<T>, n?: number): T;
}

/**
 * 获取类数组的第 `n` 个元素。如果 `n` 为负数，则返回从数组结尾开始的第 `n` 个元素。
 *
 * 同 `Array.prototype.at` 方法。
 *
 * @alias module:Array.nth
 * @since 1.0.0
 * @param {ArrayLike} array 要查询的类数组。
 * @param {number} [n=0] 要返回元素的索引值。默认 `0`。
 * @returns {*} 类数组的第 `n` 个元素。
 * @example
 *
 * const arr = ['a', 'b', 'c', 'd'];
 *
 * nth(arr, 1); // 'b'
 *
 * nth(arr, -2); // 'c'
 *
 * nth('abcd', 1); // 'b'
 *
 */
const nth: Nth = function <T = any>(array: ArrayLike<T>, n = 0) {
  if (!isArrayLike(array)) {
    return nativeUndefined;
  }

  n += n < 0 ? array.length : 0;
  return array[n];
};

export default nth;
