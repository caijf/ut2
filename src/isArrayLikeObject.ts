import isArrayLike from './isArrayLike';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为类数组对象。
 *
 * @static
 * @alias module:Type.isArrayLikeObject
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为类数组对象
 * @example
 *
 * isArrayLike([1, 2, 3]); // true
 *
 * isArrayLike(document.body.children); // true
 *
 * isArrayLike('abc'); // false
 *
 * isArrayLike(()=>{}); // false
 *
 */
function isArrayLikeObject(value: any) {
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
