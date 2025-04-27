import getTag from './internals/getTag';
import { nodeIsTypedArray } from './internals/nodeUtil';
import isArrayLikeObject from './isArrayLikeObject';

const typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(16|32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;

/**
 * 检查值是否为类型化数组。
 *
 * @alias module:Language.isTypedArray
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays Typed_arrays}
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为类型化数组，返回 `true`，否则返回 `false`。
 * @example
 *
 * isTypedArray(new Uint8Array); // true
 *
 * isTypedArray([]); // false
 *
 */
function isTypedArray(value: any) {
  if (nodeIsTypedArray) {
    return nodeIsTypedArray(value);
  }
  if (isArrayLikeObject(value)) {
    return typedArrayPattern.test(getTag(value));
  }
  return false;
}

export default isTypedArray;
