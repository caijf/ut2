import defaultTo from './defaultTo';
import { FUNC_ERROR_TEXT } from './internals/helpers';
import { FunctionAny } from './internals/types';
import toNumber from './toNumber';

/**
 * 创建一个函数，当它被调用 `n` 或更多次之后触发 `func`。
 *
 * @static
 * @alias module:Function.after
 * @since 1.0.0
 * @param {number} n 函数应该在调用多少次后执行。
 * @param {Function} func 用来限定的函数。
 * @returns {Function} 新的限定函数。
 * @example
 *
 * const saves = ['profile', 'settings'];
 * const done = after(saves.length, () => console.log('done saving!'));
 *
 * saves.forEach(item=>{
 *   console.log(item);
 *   done();
 * });
 * // 'profile'
 * // 'settings'
 * // 'done saving!'
 *
 */
function after<T extends FunctionAny>(n: number, func: T) {
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = defaultTo(toNumber(n), 0);
  return function () {
    if (--n < 1) {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      return func.apply(this, arguments);
    }
  } as T;
}

export default after;
