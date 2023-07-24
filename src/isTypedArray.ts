import { checkTypes } from './internals/checkType';
import { typedArrayTags } from './internals/native';
import { nodeIsTypedArray } from './internals/nodeUtil';
import isLength from './isLength';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为类型化数组。
 *
 * @static
 * @alias module:Language.isTypedArray
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays | Typed_arrays}
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为类型化数组，返回 `true` ，否则返回 `false` 。
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
  return isObjectLike(value) && isLength(value.length) && checkTypes(value, typedArrayTags);
}

export default isTypedArray;
