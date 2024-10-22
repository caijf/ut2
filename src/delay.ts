import defaultTo from './defaultTo';
import { FUNC_ERROR_TEXT } from './internals/helpers';
import { FunctionAny } from './internals/types';
import toNumber from './toNumber';

/**
 * 延迟 `wait` 毫秒后调用 `func`。
 *
 * @alias module:Function.delay
 * @since 1.0.0
 * @param {Function} func 要延迟的函数。
 * @param {number} wait 要延迟的毫秒数。
 * @param {...*} [args] 调用函数时传入的参数。
 * @returns {number} 定时器 `id`。
 * @example
 *
 * // 延迟 1000 毫秒后执行
 * delay(function(text){
 *   console.log(text);
 * }, 1000, 'hello world');
 *
 * // 'hello world'
 *
 */
function delay<T extends FunctionAny>(this: any, func: T, wait: number, ...args: Parameters<T>) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  const context = this;
  wait = defaultTo(toNumber(wait), 0);

  return setTimeout(() => {
    func.apply(context, args);
  }, wait);
}

export default delay;
