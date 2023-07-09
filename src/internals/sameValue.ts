import { objectIs } from './helpers';

/**
 * 检查两个值是否相等。
 *
 * @private
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness | JavaScript 中的相等性判断}
 * @see {@link https://tc39.es/ecma262/#sec-samevalue | SameValue}
 * @param {*} value 要比较的值。
 * @param {*} other 另一个要比较的值。
 * @returns {boolean} 如果两个值相等返回 `true`， 否则返回 `false` 。
 */
function sameValue(value: any, other: any) {
  if (typeof objectIs === 'function') {
    return objectIs(value, other);
  }
  return value === other ? value !== 0 || 1 / value === 1 / other : value != value && other != other;
}

export default sameValue;
