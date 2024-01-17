import { mathCeil, mathMax } from './internals/native';
import isNil from './isNil';
import toFinite from './toFinite';

function range(start: number, end: number, step: number): number[];
function range(start: number, end: number): number[];
function range(end: number): number[];

/**
 * 创建一个升序或降序的数字数组。
 *
 * 如果省略 `start` 默认为 0 。
 *
 * @static
 * @alias module:Util.range
 * @since 1.6.0
 * @param {number} [start=0] 开始值。
 * @param {number} end 结束值。
 * @param {number} [step] 要增加或减少的值。如果值为 `0` ，将视为无效参数。如果 `start` 在 `end` 之前，默认为 1 ，否则默认为 -1。
 * @return {number[]} 从开始值（包含）到结束值（不包含）逐步递增或递减的数字数组。
 * @example
 *
 * range(4); // [0, 1, 2, 3]
 * range(-4); // [0, -1, -2, -3]
 * range(1, 5); // [1, 2, 3, 4]
 * range(0, 20, 5); // [0, 5, 10, 15]
 * range(0, -4, -1); // [1, 2, 3]
 * range(1, 4, 0); // [1, 2, 3]
 * range(0); // []
 */
function range(start: number, end?: number, step?: number) {
  start = toFinite(start);
  if (isNil(end)) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }

  step = toFinite(step);

  // 值为 0, '', null, undefined 时
  if (!step) {
    step = start < end ? 1 : -1;
  }

  let index = -1;
  let length = mathMax(mathCeil((end - start) / step), 0);
  const result = Array(length);
  while (length--) {
    result[++index] = start;
    start += step;
  }

  return result;
}

export default range;
