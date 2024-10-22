import { mathCeil } from './internals/native';
import isArray from './isArray';
import toLength from './toLength';

/**
 * 将数组拆分成多个 `size` 长度的区块，并将这些区块组成一个新数组。
 *
 * 如果数组无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
 *
 * @alias module:Array.chunk
 * @since 1.0.0
 * @param {Array} array 要处理的数组。
 * @param {number} [size=1] 每个数组区块的长度。默认 `1`。
 * @returns {Array} 拆分区块的新数组。
 * @example
 *
 * const array = ['a', 'b', 'c', 'd'];
 *
 * chunk(array, 2); // [['a', 'b'], ['c', 'd']]
 *
 * chunk(array, 3); // [['a', 'b', 'c'], ['d']]
 *
 */
function chunk<T>(array: T[], size = 1) {
  size = toLength(size);
  if (!isArray(array) || size < 1) {
    return [];
  }

  const length = array.length;
  const result: T[][] = Array(mathCeil(length / size));
  let resIndex = 0,
    index = 0;

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }

  return result;
}

export default chunk;
