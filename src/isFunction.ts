import isType from './internals/isType';
import isObject from './isObject';

/**
 * 检查值是否为 `Function` 对象 。
 *
 * `Function` `AsyncFunction` `GeneratorFunction` `Proxy` 都将返回 `true` 。
 *
 * @static
 * @alias module:Type.isFunction
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `Function` 对象
 * @example
 *
 * isFunction(()=>{})); // true
 *
 * isFunction(/x/); // false
 *
 */
function isFunction(value: any) {
  if (!isObject(value)) {
    return false;
  }
  return isType(value, ['Function', 'AsyncFunction', 'GeneratorFunction', 'Proxy']);
}

export default isFunction;
