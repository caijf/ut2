/**
 * 节流
 *
 * @static
 * @alias module:Function.throttle
 * @since 1.0.0
 * @param {function} fn 函数
 * @param {number} [wait=300] 节流时间
 * @returns {function} 节流函数
 */
function throttle<T extends (...args: any[]) => any = (...args: any[]) => void>(fn: T, wait = 300) {
  // @ts-ignore
  const context = this;
  let lastCallTime = Date.now();
  let hasTimer = false;
  let cacheArgs: any[] = [];

  return ((...args: any[]) => {
    cacheArgs = args;
    if (hasTimer) return;

    const now = Date.now();
    const diffTime = now - lastCallTime;

    if (diffTime >= wait) {
      lastCallTime = now;
      fn.call(context, cacheArgs);
    } else {
      hasTimer = true;
      setTimeout(() => {
        hasTimer = false;
        lastCallTime = Date.now();
        fn.call(context, cacheArgs);
      }, wait - diffTime);
    }
  }) as T;
}

export default throttle;
