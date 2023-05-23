import isObjectLike from './isObjectLike';
import isPlainObject from './isPlainObject';

/**
 * 检查值是否可能为 `DOM` 元素。
 *
 * @static
 * @alias module:Type.isElement
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `DOM` 元素，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isElement(document.body); // true
 *
 * isElement('<body>'); // false
 *
 */
function isElement(value: any) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export default isElement;
