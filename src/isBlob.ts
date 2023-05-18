import isType from './internals/isType';
import { blobExisted } from './internals/native';

/**
 * 检查值是否为 `Blob` 对象。
 *
 * 浏览器环境的 `Blob` 或 `File` 对象，或其他继承自 `Blob` 的实例，都将返回 `true` 。
 *
 * @static
 * @alias module:Type.isBlob
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Blob|Blob}
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/File|File}
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `Blob` 对象
 * @example
 *
 * isBlob(new Blob(['a'])); // true
 *
 * isBlob({}); // false
 *
 * isBlob('2012'); // false
 *
 */
function isBlob(value: any) {
  return (
    // instanceof 不支持跨域对象判断，如来自 iframe 的 Blob 对象
    (blobExisted && value instanceof Blob) || isType(value, 'Blob') || isType(value, 'File')
  );
}

export default isBlob;
