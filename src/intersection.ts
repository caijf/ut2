import eq from './eq';
import createIteratee from './internals/createIteratee';
import isArray from './isArray';

/**
 * 创建唯一值的数组，该数组包含 2 个数组参数都包含的元素（交集）。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。如果传入迭代函数，会调用数组的每个元素以产生唯一性计算的标准。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Array.intersection
 * @since 1.0.0
 * @param {Array} array 要检查的数组。
 * @param {Array} other 另一个要检查的数组。
 * @param {Function | string} [iteratee] 迭代函数，调用每个元素。
 * @returns {Array} 包含所有传入数组交集元素的新数组。
 * @example
 *
 * intersection([2, 1, 1], [4, 2]); // [2]
 *
 * intersection([2.1, 1.2], [4.3, 2.4], Math.floor); // [2.1]
 *
 * intersection([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], item=>item.x); // [{x: 1}]
 *
 * // 迭代函数可以直接写入属性。
 * intersection([{x: 1}, {x: 1}, {x: 2}, {x: 2}], [{x: 1}], 'x'); // [{x: 1}]
 *
 */
function intersection<T, F extends (value: T) => any, K extends keyof T>(
  array: T[],
  other: T[],
  iteratee?: F | K
) {
  if (!isArray(array) || !isArray(other)) {
    return [];
  }

  const internalIteratee = createIteratee<T, F, K>(iteratee);
  const caches: any[] = [];
  return array.filter((item) => {
    const current = internalIteratee(item);

    if (
      other.findIndex((value) => eq(internalIteratee(value), current)) !== -1 &&
      !caches.includes(current)
    ) {
      caches.push(current);
      return true;
    }
    return false;
  });
}

export default intersection;
