import defaultTo from './defaultTo';
import { FUNC_ERROR_TEXT } from './internals/helpers';
import { nativeUndefined } from './internals/native';
import { FunctionAny } from './internals/types';
import toNumber from './toNumber';

/**
 * 创建一个调用 `func` 的函数，调用次数少于 `n` 次。之后再调用这个函数，将返回最后一次调用 `func` 的结果。
 *
 * @alias module:Function.before
 * @since 1.0.0
 * @param {number} n 不再调用 `func` 的次数。
 * @param {Function} func 限制执行的函数。
 * @returns {Function} 新的限定函数。
 * @example
 *
 * let count = 0;
 *
 * const increment = before(3, () => {
 *   return ++count;
 * });
 *
 * increment(); // 1
 * increment(); // 2
 * increment(); // 2 返回之前的结果
 *
 */
function before<T extends FunctionAny>(n: number, func: T) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  let result: ReturnType<T>;
  n = defaultTo(toNumber(n), 0);
  return function () {
    if (--n > 0) {
      // @ts-expect-error
      // eslint-disable-next-line prefer-rest-params
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      // @ts-expect-error
      func = nativeUndefined;
    }
    return result;
  } as T;
}

export default before;
