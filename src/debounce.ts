import baseDebounce from './internals/baseDebounce';
import { FunctionAny } from './internals/types';

/**
 * 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒数后调用 `func` 方法。
 *
 * 防抖动函数还提供以下方法：
 * 1. `cancel` 方法取消延迟的函数调用。
 * 2. `flush` 方法立即调用。
 * 3. `pending` 方法是否在等待函数执行。
 *
 * @alias module:Function.debounce
 * @since 1.0.0
 * @param {Function} func 要防抖动的函数。
 * @param {number} [wait=0] 需要延迟的毫秒数。默认 `0`。
 * @param {boolean} [immediate=false] 是否在延迟开始前调用。默认 `false`。
 * @returns {Function} 防抖动函数。
 * @example
 *
 * function calculateLayout(e){
 *   console.log('calculate layout event: ', e);
 * }
 *
 * // 避免窗口在变动时出现昂贵的计算开销。
 * window.addEventListener('resize', debounce(calculateLayout, 200));
 *
 * const debounced = debounce(()=>{
 *   // do something
 * }
 *
 * // 点击按钮立即执行，而后如果在每 300 毫秒内连续点击，将在最后一次点击延迟 300 毫秒后执行。
 * document.querySelector('button').addEventListener('click', debounced, 300, true));
 *
 * // 取消防抖动调用
 * window.addEventListener('popstate', debounced.cancel);
 *
 */
function debounce<T extends FunctionAny>(func: T, wait = 0, immediate = false) {
  return baseDebounce(func, wait, immediate);
}

export default debounce;
