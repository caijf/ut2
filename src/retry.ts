import sleep from './sleep';
import tryit from './tryit';

/**
 * 异步函数错误重试。
 *
 * @alias module:Util.retry
 * @since 1.14.0
 * @param {Function} fn 异步函数。
 * @param {Object} [options] 配置项。
 * @param {number} [options.times=3] 异步函数发生错误，最多重试次数。默认 `3`。
 * @param {number} [options.delay] 重试延迟时长，单位毫秒。
 * @param {Function} [options.backoff] 类似于延迟，便于实现指数后退。
 * @param {Function} [options.exit] 主动退出断言。
 * @returns 如果异步函数 `resolve` ，返回异步函数结果，否则抛出错误。
 * @example
 * let count = 1;
 * const fn = () => ++count < 3 ? Promise.reject('error') : Promise.resolve('success');
 * const result = await retry(fn); // 'success';
 *
 * try{
 *   // 延迟使用指数后退。
 *   await retry(verifySecret, { times: 100, backoff(count){ return count*count } })
 * }catch(err){
 *   console.log(err);
 * }
 */
async function retry<T>(
  fn: () => Promise<T>,
  options?: {
    times?: number;
    delay?: number;
    backoff?: (count: number) => number;
    exit?: (err: any, count: number) => boolean;
  }
  // @ts-ignore
): Promise<T> {
  const { times = 3, delay, backoff, exit } = options || {};
  for (let i = 1; i <= times; i++) {
    const [err, result] = await tryit(fn)();
    if (!err) return result;
    if ((exit && exit(err, i)) || i === times) throw err;
    if (delay) await sleep(delay);
    if (backoff) await sleep(backoff(i));
  }
}

export default retry;
