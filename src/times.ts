import identity from './identity';
import { MAX_ARRAY_LENGTH, MAX_SAFE_INTEGER, mathFloor, mathMin } from './internals/native';
import isInteger from './isInteger';
import isFinite from './isFinite';

function times<T>(n: number, iteratee: (index: number) => T): T[];
function times(n: number): number[];
/**
 * 调用 `iteratee` `n` 次，每次调用返回的结果存入到数组中。
 *
 * `iteratee` 调用传入 1 个参数 `index` 。
 *
 * @static
 * @alias module:Util.times
 * @since 1.0.0
 * @param {number} n 调用 `iteratee` 的次数。
 * @param {Function} [iteratee=identity] 每次迭代调用的函数。
 * @returns {Array} 调用结果的数组。
 * @example
 *
 * times(3); // [0, 1, 2]
 *
 * times(3, String); // ['0', '1', '2']
 *
 * times(4, () => 0); // [0, 0, 0, 0]
 *
 */
function times<T>(n: number, iteratee = identity): T[] {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }

  let index = 0;
  const length = mathMin(isInteger(n) ? n : mathFloor(isFinite(n) ? n : 0), MAX_ARRAY_LENGTH);
  const result = Array(length);
  const func = typeof iteratee === 'function' ? iteratee : identity;

  while (index < length) {
    result[index] = func(index);
    index++;
  }

  return result;
}

export default times;
