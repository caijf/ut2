import { nativeUndefined } from './internals/native';
import { SingleAsyncFn, SingleSyncFn } from './internals/types';
import isPromiseLike from './isPromiseLike';

interface Guard {
  <R>(fn: SingleAsyncFn<R>, shouldGuard?: () => boolean): Promise<R | undefined>;
  <R>(fn: SingleSyncFn<R>, shouldGuard?: () => boolean): R | undefined;
}

/**
 * 函数守卫。
 *
 * @alias module:Util.guard
 * @since 1.14.0
 * @param {Function} fn 要执行的函数。
 * @param {Function} [shouldGuard] 函数守卫断言。如果返回 `Truthy` 表示需要守卫，否则不需要守卫。
 * @returns 如果函数执行成功，正常返回结果；如果异步函数拒绝或抛出错误时，有函数守卫返回 `undefined`，否则抛出错误。
 * @example
 * guard(() => 42); // 42
 * await guard(() => Primise.resolve(42)); // 42
 *
 * guard(() => { throw new Error() }); // undefined
 * await guard(() => Promise.reject()); // undefined
 */
const guard: Guard = <R>(fn: SingleAsyncFn<R> | SingleSyncFn<R>, shouldGuard?: (err: any) => boolean) => {
  const _guard = (err: any) => {
    if (shouldGuard && !shouldGuard(err)) {
      throw err;
    }
    return nativeUndefined;
  };
  try {
    const result = fn();
    return isPromiseLike(result) ? result.catch(_guard) : result;
  } catch (err) {
    return _guard(err);
  }
};

export default guard;
