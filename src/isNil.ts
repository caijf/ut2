import isUndefined from './isUndefined';
import isNull from './isNull';

/**
 * 检查值是否为 undefined 或 null
 *
 * @static
 * @alias module:Type.isNil
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为 undefined 或 null
 * @example
 *
 * isNil(undefined); // true
 * isNil(void 0); // true
 * isNil(null); // true
 * isNil(''); // false
 * isNil('a'); // false
 * isNil(1); // false
 */
function isNil(value: any) {
  return isUndefined(value) || isNull(value);
}

export default isNil;
