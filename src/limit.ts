import { FunctionAny } from './internals/types';

/**
 * 创建一个限流函数，该函数在时间间隔内只会执行一次。
 *
 * 与 `throttle` 的区别：
 * 1. 在时间间隔内再次调用，`limit`不会执行，而`throttle` 会执行；
 * 2. `limit` 没有取消和立即执行的方法，逻辑更简洁。
 *
 * @alias module:Function.limit
 * @since 1.19.0
 * @param {Function} fn 要限流的函数。
 * @param {number} timespan 限流的时间间隔，单位为毫秒。
 * @returns 限流函数。
 * @example
 * function revalidate(){
 *   if(document.visibilityState !== 'hidden' || navigator.onLine){
 *     // do something
 *     console.log('revalidate');
 *   }
 * }
 *
 * // 限制 5s 内只会执行一次
 * const limited = limit(revalidate, 5000);
 *
 * window.addEventListener('visibilitychange', limited);
 * window.addEventListener('focus', limited);
 */
export default function limit<T extends FunctionAny>(fn: T, timespan: number) {
  let pending = false;
  function limited(...args: Parameters<T>) {
    if (pending) return;
    pending = true;
    fn(...args);
    setTimeout(() => {
      pending = false;
    }, timespan);
  }
  return limited;
}
