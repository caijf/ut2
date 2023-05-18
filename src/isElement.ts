import isObjectLike from './isObjectLike';
import isPlainObject from './isPlainObject';

/**
 * 检查值是否可能为 `DOM` 元素。
 *
 * @static
 * @alias module:Type.isElement
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否可能为 `DOM` 元素
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
