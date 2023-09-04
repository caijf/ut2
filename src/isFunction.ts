import { functionTags, objectToString } from './internals/native';

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
function isFunction(value: any): value is (...args: any[]) => any {
  if (typeof value === 'function') {
    return true;
  }
  const tag = objectToString.call(value);
  return functionTags.some((item) => item === tag);
}

export default isFunction;
