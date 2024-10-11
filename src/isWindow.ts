import getTag from './internals/getTag';
import { windowTag } from './internals/native';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Window` 对象。
 *
 * @static
 * @alias module:Language.isWindow
 * @since 1.10.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Window` 对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * isWindow({}); // false
 *
 * // 浏览器环境
 * isWindow(globalThis); // true
 * isWindow(window); // true
 * isWindow(self); // true
 * isWindow(frames); // true
 *
 */
function isWindow(value: any): value is Window {
  return isObjectLike(value) && getTag(value) === windowTag;
}

export default isWindow;
