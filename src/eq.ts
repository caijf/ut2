/**
 * 检查两个值是否相等。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。
 *
 * @static
 * @alias module:Util.eq
 * @since 1.0.0
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @returns {boolean} 如果两个值相等，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * eq(0, -0); // true
 *
 * eq(1, 1); // true
 *
 * eq(NaN, NaN); // true
 *
 * eq('a', 'a'); // true
 *
 * const object = {a: 1};
 *
 * eq(object, {a: 1}); // false
 *
 * eq(object, object); // true
 *
 */
function eq(value: any, other: any) {
  return value === other || (value !== value && other !== other);
}

export default eq;
