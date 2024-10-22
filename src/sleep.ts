/**
 * 异步方法中等待时间后继续执行。
 *
 * @alias module:Util.sleep
 * @since 1.0.0
 * @param {number} [ms=1000] 等待时间，单位毫秒。默认 `1000`。
 * @returns {Promise<void>} 异步对象。
 * @example
 *
 * async ()=>{
 *   await sleep();
 *   // do something
 * }
 *
 * sleep(300).then(()=>{
 *   // do something
 * })
 *
 */
function sleep(ms = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default sleep;
