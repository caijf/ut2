import isType from './internals/isType';
import { nodeIsArrayBuffer } from './internals/nodeUtil';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `ArrayBuffer` 对象。
 *
 * @static
 * @alias module:Type.isArrayBuffer
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
  return nodeIsArrayBuffer
    ? nodeIsArrayBuffer(value)
    : isObjectLike(value) && isType(value, 'ArrayBuffer');
}

export default isArrayBuffer;
