import isArray from './isArray';
import uniq from './uniq';

/**
 * 创建一个按顺序排列的唯一值的数组（并集）。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。如果传入迭代函数，会调用数组的每个元素以产生唯一性计算的标准。与 [`uniq`](#.uniq) 相似。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Array.union
 * @since 1.0.0
 * @param {Array} array 要检查的数组。
 * @param {Array} [other=[]] 另一个要检查的数组。
 * @param {Function | string} [iteratee] 迭代函数，调用每个元素。
 * @returns {Array} 新的联合数组。
 * @example
 *
 * union([2], [1, 2]); // [2, 1]
 *
 * union([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
 *
 * intersection([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], item=>item.x); // [{x: 1}, {x: 2}]
 *
 * // 迭代函数可以直接写入属性。
 * intersection([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], 'x'); // [{x: 1}, {x: 2}]
 *
 */
function union<T, F extends (value: T) => any, K extends keyof T>(
  array: T[],
  other: T[] = [],
  iteratee?: F | K
) {
  array = isArray(array) ? array : [];
  other = isArray(other) ? other : [];
  return uniq([...array, ...other], iteratee);
}

export default union;
