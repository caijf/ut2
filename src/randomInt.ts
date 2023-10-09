import { mathCeil, mathFloor, mathMax, mathMin, mathRandom } from './internals/native';
import toFinite from './toFinite';

/**
 * 产生一个包含 `lower` 与 `upper` 之间的随机整数。
 *
 * 如果参数非整数 `lower=Math.ceil(lower)` `upper=Math.floor(upper)` 。如果 `lower` 大于 `upper` 会自动交换参数。
 *
 * @static
 * @alias module:Number.randomInt
 * @since 1.0.0
 * @param {number} [lower=0] 下限。
 * @param {number} [upper=1] 上限。
 * @returns {number} 随机整数。
 * @example
 *
 * randomInt(); // 0 到 1 之间的整数
 *
 * randomInt(2, 4); // 2 到 4 之间的整数
 *
 * randomInt(4, 2); // 2 到 4 之间的整数
 *
 * randomInt(1.2, 2.4); // 2
 *
 */
function randomInt(lower = 0, upper = 1) {
  lower = toFinite(lower);
  upper = toFinite(upper);
  let min = mathCeil(mathMin(lower, upper) || 0);
  let max = mathFloor(mathMax(lower, upper) || 0);

  // 如果两个值都是整数位相同，浮点数不同， 大小值的可能会互换。（如 1.2, 1.3）
  if (min > max) {
    // [min, max] = [max, min]
    const temp = min;
    min = max;
    max = temp;
  }

  return mathFloor(min + mathRandom() * (max - min + 1));
}

export default randomInt;
