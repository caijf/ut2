import shallowEqual from './shallowEqual';
import { mathCeil } from './internals/native';

type Cache<TFunc extends (...args: any[]) => any> = {
  lastThis: ThisParameterType<TFunc>;
  lastArgs: Parameters<TFunc>;
  lastReturn: ReturnType<TFunc>;
};

type EqualFn<TFunc extends (...args: any[]) => any> = (newArgs: Parameters<TFunc>, lastArgs: Parameters<TFunc>) => boolean;

/**
 * 创建一个缓存 `func` 结果的函数。
 *
 * 如果上下文和参数一致，直接返回缓存结果，否则执行函数并缓存。
 *
 * 返回的函数含有一个 `clear` 方法，用于清除缓存。
 *
 * @alias module:Function.memoize
 * @since 1.17.0
 * @param {Function} func 要缓存结果的函数。
 * @param {Object} [options] 配置项。
 * @param {Function} [options.isEqual] 自定义比较参数方法。默认函数 `shallowEqual`。
 * @param {number} [options.max] 最大缓存数量，`0`表示不限制。默认`0`。
 * @returns 缓存 `func` 结果的函数。
 * @example
 * const memoizedValues = memoize(Object.values);
 * const object = { a: 1, b: 2 };
 * const other = { a: 3, b: 4 };
 *
 * memoizedValues(object); // [1, 2]
 * memoizedValues(other); // [3, 4]
 *
 * object.a = 2;
 * memoizedValues(object); // [1, 2]
 *
 * // 清空缓存
 * memoizedValues.clear();
 *
 * memoizedValues(object); // [2, 2]
 *
 * // 限制缓存数量。如限制缓存数量为1时，效果同 memoize-one 。
 * const memoizedOneValues = memoize(Object.values, { max: 1 });
 *
 * // 自定义比较函数。如深比较。
 * import { isEqual } from 'ut2'
 * const deepMemoizedValues = memoize(Object.values, { isEqual });
 * const result1 = deepMemoizedValues({ a: 1 });
 * const result2 = deepMemoizedValues({ a: 1 });
 * console.log(result1 === result2); // true
 *
 */
function memoize<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  options?: {
    isEqual?: EqualFn<TFunc>;
    max?: number;
  }
) {
  const opts = options || {};
  const max = mathCeil(opts.max || 0);
  const isEqual = typeof opts.isEqual === 'function' ? opts.isEqual : shallowEqual;
  const cache: Cache<TFunc>[] = [];
  function memoized(this: any, ...newArgs: Parameters<TFunc>) {
    const cacheValue = cache.find((item) => item.lastThis === this && isEqual(item.lastArgs, newArgs));
    if (cacheValue) {
      return cacheValue.lastReturn;
    }
    const lastReturn = func.apply(this, newArgs);
    if (max > 0 && cache.length >= max) {
      cache.shift();
    }
    cache.push({
      lastArgs: newArgs,
      lastThis: this,
      lastReturn
    });
    return lastReturn;
  }
  memoized.clear = function () {
    cache.length = 0;
  };
  return memoized;
}

export default memoize;
