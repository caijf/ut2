import debounce from './debounce';

/**
 * 创建一个节流函数，该函数在 `wait` 毫秒数内最多执行一次 `func` 方法。
 *
 * 节流函数还提供以下方法：
 * 1. `cancel` 方法取消延迟的函数调用。
 * 2. `flush` 方法立即调用。
 * 3. `pending` 方法是否在等待函数执行。
 *
 * @static
 * @alias module:Function.throttle
 * @since 1.0.0
 * @param {Function} func 要节流的函数。
 * @param {number} [wait=0] 需要节流的毫秒数。
 * @param {boolean} [immediate=true] 是否在节流开始前调用。
 * @returns 节流函数。
 * @example
 *
 * function updatePosition(e){
 *   console.log('update position event: ', e);
 * }
 *
 * // 避免在滚动时频繁的更新定位。
 * window.addEventListener('scroll', throttle(updatePosition, 100));
 *
 * const throttled = throttle(()=>{
 *   // do something
 * }
 *
 * // 点击按钮， 300 毫秒内最多执行一次。
 * document.querySelector('button').addEventListener('click', throttled, 300));
 *
 * // 取消节流调用。
 * window.addEvenetListener('popstate', throttled.cancel);
 *
 */
function throttle<T extends (...args: any[]) => any>(func: T, wait = 0, immediate = true) {
  return debounce(func, wait, immediate, true);
}

export default throttle;
