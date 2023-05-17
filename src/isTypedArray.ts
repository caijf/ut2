import isType from './internals/isType';
import { nodeIsTypedArray } from './internals/nodeUtil';

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
    isType(value, 'Float32Array') ||
    isType(value, 'Float64Array') ||
    isType(value, 'Int8Array') ||
    isType(value, 'Int16Array') ||
    isType(value, 'Int32Array') ||
    isType(value, 'Uint8Array') ||
    isType(value, 'Uint8ClampedArray') ||
    isType(value, 'Uint16Array') ||
    isType(value, 'Uint32Array')
  );
}

export default isTypedArray;
