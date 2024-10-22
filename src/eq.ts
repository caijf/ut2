/**
 * 检查两个值是否相等。
 *
 * 默认使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。如果 `strictCheck=true` 将使用 [`SameValue`](https://tc39.es/ecma262/#sec-samevalue) 做等值比较。
 *
 * @alias module:Util.eq
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness | JavaScript 中的相等性判断}
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @param {boolean} [strictCheck=false] 严格比较，区分 `0` `-0`。默认 `false`。
 * @returns {boolean} 如果两个值相等，返回 `true`，否则返回 `false`。
 * @example
 *
 * eq(-0, 0); // true
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
 * eq(-0, 0, true); // false
 *
 */
function eq(value: any, other: any, strictCheck = false) {
  if (value === other) {
    return strictCheck ? value !== 0 || 1 / value === 1 / other : true;
  }
  return value !== value && other !== other;
}

export default eq;
