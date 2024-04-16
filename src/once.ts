import before from './before';
import { FunctionAny } from './internals/types';

/**
 * 创建一个只能调用 `func` 一次的函数。重复调用将返回第一次调用 `func` 的结果。
 *
 * @static
 * @alias module:Function.once
 * @since 1.2.0
 * @requires module:Function.before
 * @param {Function} func 限制执行的函数。
 * @returns {Function} 新的限定函数。
 * @example
 *
 * let count = 0;
 *
 * const increment = _.once(()=>{
 *   return ++count;
 * });
 *
 * increment(); // 1
 * increment(); // 1
 * increment(); // 1
 *
 */
function once<T extends FunctionAny>(func: T) {
  return before(2, func);
}

export default once;
