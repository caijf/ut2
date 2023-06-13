import defaultTo from './defaultTo';
import { FUNC_ERROR_TEXT } from './internals/helpers';
import toNumber from './toNumber';

export function baseDebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean,
  __throttle__ = false
) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  let timer: any,
    lastCallTime: number | undefined,
    lastInvokeTime: number,
    lastArgs: any[] | undefined,
    lastThis: any,
    result: ReturnType<T>;

  wait = defaultTo(toNumber(wait), 0);

  function shouldInvoke(time: number) {
    if (lastCallTime === undefined) {
      return true;
    }
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (__throttle__ && timeSinceLastInvoke >= wait)
    );
  }

  function invokeFunc(time: number) {
    lastInvokeTime = time;
    result = func.apply(lastThis, lastArgs as any[]);
    lastThis = lastArgs = undefined;
    return result;
  }

  function debounced(this: any, ...args: Parameters<T>) {
    lastThis = this;
    lastArgs = args;

    const time = Date.now();
    const isInvoke = shouldInvoke(time); // 是否可以立即调用

    const waitTime = !__throttle__
      ? wait
      : !isInvoke && lastCallTime !== undefined && timer === undefined
      ? wait - (time - lastCallTime)
      : wait;

    lastCallTime = time;

    if (isInvoke) {
      // 立即调用，且没有定时器
      if (immediate && timer === undefined) {
        return invokeFunc(time);
      }
    }

    // 如果已有定时器，且不是节流方式，清除并重新启动定时器
    if (timer !== undefined && !__throttle__) {
      clearTimeout(timer);
      timer = undefined;
    }

    if (timer === undefined) {
      timer = setTimeout(() => {
        timer = undefined;
        invokeFunc(Date.now());
      }, waitTime);
    }

    return result;
  }

  function cancel() {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    lastCallTime = timer = lastArgs = lastThis = undefined;
  }

  function flush() {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;

      if (lastArgs) {
        return invokeFunc(Date.now());
      }
    }
    return result;
  }

  function pending() {
    return timer !== undefined;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

/**
 * 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒数后调用 `func` 方法。
 *
 * 防抖动函数还提供以下方法：
 * 1. `cancel` 方法取消延迟的函数调用。
 * 2. `flush` 方法立即调用。
 * 3. `pending` 方法是否在等待函数执行。
 *
 * @static
 * @alias module:Function.debounce
 * @since 1.0.0
 * @param {Function} func 要防抖动的函数。
 * @param {number} [wait=0] 需要延迟的毫秒数。
 * @param {boolean} [immediate=false] 是否在延迟开始前调用。
 * @returns {Function} 防抖动函数。
 * @example
 *
 * function calculateLayout(e){
 *   console.log('calculate layout event: ', e);
 * }
 *
 * // 避免窗口在变动时出现昂贵的计算开销。
 * window.addEventListener('resize', debounce(calculateLayout, 200));
 *
 * const debounced = debounce(()=>{
 *   // do something
 * }
 *
 * // 点击按钮立即执行，而后如果在每 300 毫秒内连续点击，将在最后一次点击延迟 300 毫秒后执行。
 * document.querySelector('button').addEventListener('click', debounced, 300, true));
 *
 * // 取消防抖动调用
 * window.addEventListener('popstate', debounced.cancel);
 *
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait = 0, immediate = false) {
  return baseDebounce(func, wait, immediate);
}

export default debounce;
