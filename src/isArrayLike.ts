import isFunction from './isFunction';
import isLength from './isLength';

/**
 * 检查值是否为类似数组。如果一个值不是函数并且其 `value.length` 是大于或等于 0 且小于或等于 `Number.MAX_SAFE_INTEGER` 的整数，则该值被视为类似数组。
 *
 * @static
 * @alias module:Type.isArrayLike
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为类似数组
 * @example
 *
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike(document.body.children); // true
 * isArrayLike('abc'); // true
 * isArrayLike(()=>{}); // false
 *
 */
function isArrayBuffer(value: any) {
  return value != null && isLength(value.length) && !isFunction(value);
}

export default isArrayBuffer;
