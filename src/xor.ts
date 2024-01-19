import difference from './difference';
import createIteratee from './internals/createIteratee';
import { IterateeParam } from './internals/types';
import intersection from './intersection';
import isArray from './isArray';
import union from './union';
import uniq from './uniq';

/**
 * 创建一个唯一值的数组（并集-交集），该数组包含 2 个数组参数中不相同的元素。如果传入迭代函数，会调用数组的每个元素以产生唯一性计算的标准。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * 默认使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。如果 `strictCheck=true` 将使用 [`SameValue`](https://tc39.es/ecma262/#sec-samevalue) 做等值比较。
 *
 * @static
 * @alias module:Array.xor
 * @since 1.0.0
 * @param {Array} array 要检查的数组。
 * @param {Array} [other=[]] 另一个要检查的数组。
 * @param {Function | string} [iteratee] 迭代函数，调用每个元素。
 * @param {boolean} [strictCheck=false] 严格比较，区分 `0` `-0`，默认 `false` 。
 * @returns {Array} 过滤值后的新数组。
 * @example
 *
 * xor([2, 1, 1], [4, 2]); // [1, 4]
 *
 * xor([2.1, 1.2], [4.3, 2.4], Math.floor); // [1.2, 4.3]
 *
 * xor([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], item=>item.x); // [{x: 2}]
 *
 * // 迭代函数可以直接写入属性。
 * xor([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], 'x'); // [{x: 2}]
 *
 * xor([-0, 0],[0]); // []
 *
 * xor([-0, 0],[0], undefined, true); // [-0]
 *
 */
function xor<T>(array: T[], other: T[] = [], iteratee?: IterateeParam<T>, strickCheck = false) {
  if (!isArray(array) && !isArray(other)) {
    return [];
  }
  const internalIteratee = createIteratee<T>(iteratee);
  if (!isArray(other)) {
    return uniq(array, internalIteratee, strickCheck);
  }
  if (!isArray(array)) {
    return uniq(other, internalIteratee, strickCheck);
  }
  return difference(union(array, other, internalIteratee, strickCheck), intersection(array, other, internalIteratee, strickCheck), internalIteratee, strickCheck);
}

export default xor;
