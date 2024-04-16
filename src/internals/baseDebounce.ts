import defaultTo from '../defaultTo';
import toNumber from '../toNumber';
import { FUNC_ERROR_TEXT } from './helpers';
import { FunctionAny } from './types';

function baseDebounce<T extends FunctionAny>(func: T, wait: number, immediate: boolean, __throttle__ = false) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  let timer: any, lastCallTime: number | undefined, lastInvokeTime: number, lastArgs: any[] | undefined, lastThis: any, result: ReturnType<T>;

  wait = defaultTo(toNumber(wait), 0);

  function shouldInvoke(time: number) {
    if (lastCallTime === undefined) {
      return true;
    }
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return timeSinceLastCall >= wait || timeSinceLastCall < 0 || (__throttle__ && timeSinceLastInvoke >= wait);
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

    const waitTime = !__throttle__ ? wait : !isInvoke && lastCallTime !== undefined && timer === undefined ? wait - (time - lastCallTime) : wait;

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

export default baseDebounce;
