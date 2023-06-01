import { FUNC_ERROR_TEXT } from './internals/helpers';
import { normalizeNumber } from './internals/normalize';

/**
 * 创建一个调用 `func` 的函数，调用次数不超过 `n` 次。之后再调用这个函数，将返回最后一次调用 `func` 的结果。
 *
 * @static
 * @alias module:Function.before
 * @since 1.0.0
 * @param {number} n 不再调用 `func` 的次数。
 * @param {Function} func 限制执行的函数。
 * @returns {Function} 新的限定函数。
 */
function before<T extends (...args: any[]) => any>(n: number, func: T) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  let result: ReturnType<T>;
  n = normalizeNumber(n);
  return function () {
    if (--n > 0) {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      // @ts-ignore
      func = undefined;
    }
    return result;
  } as T;
}

export default before;
