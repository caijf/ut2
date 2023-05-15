import isType from './internals/isType';

/**
 * 检查值是否为 Function|AsyncFunction|GeneratorFunction|Proxy 。
 *
 * @static
 * @alias module:Type.isFunction
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Function|AsyncFunction|GeneratorFunction|Proxy
 * @example
 *
 * isFunction(()=>{})); // true
 * isFunction(/abc/); // false
 *
 */
function isFunction(value: any) {
  return (
    isType(value, 'Function') ||
    isType(value, 'AsyncFunction') ||
    isType(value, 'GeneratorFunction') ||
    isType(value, 'Proxy')
  );
}

export default isFunction;
