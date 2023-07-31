import { checkTypes } from './internals/checkType';
import { functionTags } from './internals/native';

/**
 * 检查值是否为 `Function` 对象 。
 *
 * `Function` `AsyncFunction` `GeneratorFunction` `Proxy` 都将返回 `true` 。
 *
 * @static
 * @alias module:Language.isFunction
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Function` 对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isFunction(()=>{})); // true
 *
 * isFunction(/x/); // false
 *
 */
function isFunction(value: any) {
  return typeof value === 'function' || checkTypes(value, functionTags);
}

export default isFunction;
