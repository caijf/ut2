import { mathMax, mathMin, mathRandom } from './internals/native';
import toFinite from './toFinite';

/**
 * 产生一个包含 `lower` 与 `upper` 之间的随机浮点数。
 *
 * 如果 `lower` 大于 `upper` 会自动交换参数。
 *
 * @static
 * @alias module:Number.random
 * @since 1.0.0
 * @param {number} [lower=0] 下限。
 * @param {number} [upper=1] 上限。
 * @returns {number} 随机浮点数。
 * @example
 *
 * random(); // 0 到 1 之间的浮点数
 *
 * random(2, 4); // 2 到 4 之间的浮点数
 *
 * random(4, 2); // 2 到 4 之间的浮点数
 *
 * random(1.2, 2.4); // 1.2 到 2.4 之间的浮点数
 *
 */
function random(lower = 0, upper = 1) {
  lower = toFinite(lower);
  upper = toFinite(upper);
  const min = mathMin(lower, upper);
  const max = mathMax(lower, upper);
  return min + mathRandom() * (max - min);
}

export default random;
