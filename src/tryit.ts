import { nativeUndefined } from './internals/native';
import isPromiseLike from './isPromiseLike';

type SyncFn<P extends any[], R> = (...args: P) => R;
type AsyncFn<P extends any[], R> = (...args: P) => Promise<R>;

interface Tryit {
  <P extends any[], R>(fn: AsyncFn<P, R>): (...args: P) => Promise<[null, R] | [Error, undefined]>;
  <P extends any[], R>(fn: SyncFn<P, R>): (...args: P) => [null, R] | [Error, undefined];
}

/**
 * 包装一个函数（支持异步函数），将其转为错误优先函数。
 *
 * @alias module:Util.tryit
 * @since 1.13.0
 * @param {Function} fn 要包装的函数。
 * @returns 如果执行成功返回 `[null, result]`，否则返回 `[Error, undefined]`。
 * @example
 * const getGreet = async (name: string) => {
 *   return 'hello ' + name;
 * }
 * const [err, result] = await tryit(getGreet)('jeff');
 * console.log([err, result]);
 * // [null, 'hello jeff']
 *
 *
 * const errorFn = async (name: string) => {
 *   throw new Error('error message');
 *   return 'hello ' + name;
 * }
 * const [err2, result2] = await tryit(errorFn)('jeff');
 * console.log([err2, result2]);
 * // [Error: error message, undefined]
 */
const tryit: Tryit = <P extends any[], R>(fn: AsyncFn<P, R> | SyncFn<P, R>) => {
  return (...args: P): any => {
    try {
      const result = fn(...args);
      if (isPromiseLike(result)) {
        return result
          .then((res) => {
            return [null, res];
          })
          .catch((err) => {
            return [err, nativeUndefined];
          });
      }
      return [null, result];
    } catch (err) {
      return [err as Error, nativeUndefined];
    }
  };
};

export default tryit;
