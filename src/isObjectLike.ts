/**
 * 检查值是否为类对象。
 *
 * 如果一个值不为 `null` 并且 `typeof` 结果为 `object`，则该值是类对象。
 *
 * @static
 * @alias module:Type.isObjectLike
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为类对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isObjectLike({}); // true
 *
 * isObjectLike([1,2,3]); // true
 *
 * isObjectLike(()=>{}); // false
 *
 * isObjectLike(null); // false
 *
 */
function isObjectLike(value: any) {
  return value != null && typeof value === 'object';
}

export default isObjectLike;
