import { FUNC_ERROR_TEXT } from './internals/helpers';
import { normalizeNumber } from './internals/normalize';

/**
 * 延迟 `wait` 毫秒后调用 `func` 。
 *
 * @static
 * @alias module:Function.delay
 * @since 1.0.0
 * @param {Function} func 要延迟的函数。
 * @param {number} wait 要延迟的毫秒数。
 * @param {...*} [args] 调用函数时传入的参数。
 * @returns {number} 计时器 id 。
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
function delay<T extends (...args: any[]) => any>(func: T, wait: number, ...args: Parameters<T>) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  // @ts-ignore
  const context = this;
  wait = normalizeNumber(wait);

  return setTimeout(() => {
    func.apply(context, args);
  }, wait);
}

export default delay;
