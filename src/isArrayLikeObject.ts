import isArrayLike from './isArrayLike';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为类数组对象。
 *
 * @static
 * @alias module:Language.isArrayLikeObject
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 如果值为类数组对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isArrayLikeObject([1, 2, 3]); // true
 *
 * isArrayLikeObject(document.body.children); // true
 *
 * isArrayLikeObject('abc'); // false
 *
 * isArrayLikeObject(()=>{}); // false
 *
 */
function isArrayLikeObject(value: any) {
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
