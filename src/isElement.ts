import isObjectLike from './isObjectLike';
import isPlainObject from './isPlainObject';

/**
 * 检查值是否可能为 `DOM` 元素。
 *
 * @alias module:Language.isElement
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `DOM` 元素，返回 `true`，否则返回 `false`。
 * @example
 *
 * isElement(document.body); // true
 *
 * isElement('<body>'); // false
 *
 */
function isElement(value: any): value is Element {
  return isObjectLike(value) && (value as Element).nodeType === 1 && !isPlainObject(value);
}

export default isElement;
