import getTag from './internals/getTag';
import { fileTag, stringUndefined } from './internals/native';

// File 对象是否存在
const fileExisted = typeof File !== stringUndefined;

/**
 * 检查值是否为 `File` 对象。
 *
 * 浏览器环境的 `File` 对象，或其他继承自 `File` 的实例，都将返回 `true`。
 *
 * @alias module:Language.isFile
 * @since 1.11.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/File File}
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `File` 对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isFile(new File([], 'test.txt')); // true
 *
 * isBlob(new Blob(['a'])); // false
 *
 * isFile({}); // false
 *
 * isFile('2012'); // false
 *
 */
function isFile(value: any): value is File {
  if (fileExisted && value instanceof File) {
    return true;
  }
  return getTag(value) === fileTag;
}

export default isFile;
