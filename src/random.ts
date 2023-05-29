/**
 * 产生一个包含 `lower` 与 `upper` 之间的随机数。
 *
 * 如果 `lower` 等于 `upper` , 直接返回该值。
 *
 * 如果 `lower` 与 `upper` 差值小于 `1` ，`floating` 将强制为 `true` 。
 *
 * @static
 * @alias module:Number.random
 * @since 1.0.0
 * @param {number} [lower=0] 下限。
 * @param {number} [upper=1] 上限。
 * @param {boolean} [floating=true] 是否返回浮点数。
 * @returns {number} 随机数。
 * @example
 *
 * random(); // 0 到 1 之间的随机浮点数
 *
 * random(2, 4); // 2 到 4 之间的随机浮点数
 *
 * random(2, 4, false); // 2 到 4 之间的随机整数
 *
 * random(1.2, 2.4); // 1.2 到 2.4 之间的随机整数
 *
 */
function random(lower = 0, upper = 1, floating = true) {
  let numLow = +lower;
  let numUp = +upper;
  numLow = numLow === numLow ? numLow : 0;
  numUp = numUp === numUp ? numUp : 0;

  const low = Math.min(numLow, numUp);
  const up = Math.max(numLow, numUp);

  if (low === up) {
    return low;
  }

  const diff = up - low;
  const rand = Math.random();

  if (floating || diff < 1) {
    return Math.min(low + rand * diff, up);
  }

  const intLow = Math.ceil(low);
  const intUp = Math.floor(up);
  const intDiff = intUp - intLow;

  return Math.min(intLow + Math.floor(rand * (intDiff + 1)), intUp);
}

export default random;
