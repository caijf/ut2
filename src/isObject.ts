import { FunctionAny } from './internals/types';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为对象。(例如，数组、函数、对象、正则表达式、new Number(0) 和 new String(''))。
 *
 * @static
 * @alias module:Language.isObject
 * @since 1.0.0
 * @see {@link https://tc39.es/ecma262/#sec-ecmascript-language-types language type}
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isObject({}); // true
 *
 * isObject([1,2,3]); // true
 *
 * isObject(()=>{}); // true
 *
 * isObject(null); // false
 *
 */
function isObject(value: any): value is object | FunctionAny {
  return typeof value === 'function' || isObjectLike(value);
}

export default isObject;
