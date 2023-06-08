import createIteratee from './internals/createIteratee';
import sameValueZero from './internals/sameValueZero';
import isArray from './isArray';

/**
 * 创建一个 `array` 排除 `values` 值的新数组。使用了 [`SameValueZero`](https://tc39.es/ecma262/#sec-samevaluezero) 做等值比较。如果传入迭代函数，会调用数组的每个元素以产生唯一性计算的标准。
 *
 * `iteratee` 调用时会传入 1 个参数 `value` 。
 *
 * @static
 * @alias module:Array.difference
 * @since 1.0.0
 * @param array 要检查的数组。
 * @param values 排除的值。
 * @param iteratee 迭代函数，调用每个元素。
 * @returns 过滤值后的新数组。
 * @example
 *
 * difference([3, 1, 2], [4, 2]); // [3, 1]
 *
 * difference([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor); // [3.1, 1.3]
 *
 * difference([{x: 2}, {x: 1}], [{x: 1}], item=>item.x); // [{x: 2}]
 *
 * // 如果迭代元素为对象，迭代函数可以直接写入对象属性。
 * difference([{x: 2}, {x: 1}], [{x: 1}], 'x'); // [{x: 2}]
 *
 */
function difference<T, F extends (value: T) => any, K extends keyof T>(
  array: T[],
  values: any[],
  iteratee?: F | K
) {
  if (!isArray(array)) {
    return [];
  }

  if (!isArray(values)) {
    return array;
  }

  const internalIteratee = createIteratee<T, F, K>(iteratee);
  return array.filter((item) => {
    const current = internalIteratee(item);
    // 注意此处不能使用 `find` ，如果值存在 `undefined` 不好处理。
    // 为什么不直接使用 `includes` (includes 比较用的是 sameValueZero)，因为要支持 iteratee 。
    return values.findIndex((value) => sameValueZero(internalIteratee(value), current)) === -1;
  });
}

export default difference;
