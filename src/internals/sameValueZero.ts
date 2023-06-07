/**
 * 检查两个值是否相等。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。
 *
 * @private
 * @param {*} x 要比较的值。
 * @param {*} y 另一个要比较的值。
 * @returns {boolean} 如果相等返回 `true` ，否则返回 `false` 。
 */
function sameValueZero(x: any, y: any) {
  if (typeof x === 'number' && typeof y === 'number') {
    // x 和 y 相等（可能是 -0 和 0）或它们都是 NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}

export default sameValueZero;
