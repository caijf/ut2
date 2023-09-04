import { objectToString, regExpTag } from './internals/native';
import { nodeIsRegExp } from './internals/nodeUtil';

/**
 * 检查值是否为 `RegExp` 对象。
 *
 * @static
 * @alias module:Language.isRegExp
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 如果值为 `RegExp` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isRegExp(/abc/); // true
 *
 * isRegExp('/abc/'); // false
 *
 */
function isRegExp(value: any) {
  return nodeIsRegExp ? nodeIsRegExp(value) : objectToString.call(value) === regExpTag;
}

export default isRegExp;
