import getTag from './internals/getTag';
import { arrayBufferTag } from './internals/native';
import { nodeIsArrayBuffer } from './internals/nodeUtil';

/**
 * 检查值是否为 `ArrayBuffer` 对象。
 *
 * @static
 * @alias module:Language.isArrayBuffer
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `ArrayBuffer` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(8)); // true
 *
 * isArrayBuffer({}); // false
 *
 * isArrayBuffer('2012'); // false
 *
 */
function isArrayBuffer(value: any) {
  return nodeIsArrayBuffer ? nodeIsArrayBuffer(value) : getTag(value) === arrayBufferTag;
}

export default isArrayBuffer;
