import isType from './internals/isType';
import { nodeIsTypedArray } from './internals/nodeUtil';
import isLength from './isLength';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为类型化数组。
 *
 * @static
 * @alias module:Type.isTypedArray
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为类型化数组
 * @example
 *
 * ut2.isTypedArray(new Uint8Array); // true
 *
 * ut2.isTypedArray([]); // false
 *
 */
function isTypedArray(value: any) {
  if (nodeIsTypedArray) {
    return nodeIsTypedArray(value);
  }
  return (
    isObjectLike(value) &&
    isLength(value.length) &&
    isType(value, [
      'Float32Array',
      'Float64Array',
      'Int8Array',
      'Int16Array',
      'Int32Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Uint16Array',
      'Uint32Array'
    ])
  );
}

export default isTypedArray;
