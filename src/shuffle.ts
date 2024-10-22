import isArray from './isArray';
import randomInt from './randomInt';

/**
 * 创建一个被打乱的数组。使用 [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) 版本。
 *
 * @alias module:Array.shuffle
 * @since 1.0.0
 * @param {Array} array 要打乱的数组。
 * @returns {Array} 打乱的数组。
 * @example
 *
 * shuffle([1, 2, 3, 4]); // [2, 4, 3, 1]
 *
 * shuffle([1, 2, 3, 4]); // [3, 2, 1, 4]
 *
 */
function shuffle<T>(array: T[]) {
  if (!isArray(array) || array.length < 1) {
    return [];
  }

  const result = array.slice();
  const length = result.length;
  const lastIndex = length - 1;
  let index = -1;

  while (++index < length) {
    const rand = randomInt(index, lastIndex);
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }

  return result;
}

export default shuffle;
