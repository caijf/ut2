import isType from './internals/isType';
import { nodeIsRegExp } from './internals/nodeUtil';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 RegExp 对象。
 *
 * @static
 * @alias module:Type.isRegExp
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 RegExp 对象
 * @example
 *
 * isRegExp(/abc/); // true
 *
 * isRegExp('/abc/'); // false
 *
 */
function isRegExp(value: any) {
  return nodeIsRegExp ? nodeIsRegExp(value) : isObjectLike(value) && isType(value, 'RegExp');
}

export default isRegExp;
