import isArray from './isArray';

interface FromPairs {
  <P extends string | number | symbol, V = any>(array: [P, V][]): Record<P, V>;
  <P extends string | number | symbol>(array: any[][]): Record<P, any>;
}

/**
 * 将键值对数组转为对象。
 *
 * 与 [Object.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) 正好相反。
 *
 * @static
 * @alias module:Array.fromPairs
 * @since 1.0.0
 * @param {Array} array 键值对数组。
 * @returns {Object} 新对象。
 * @example
 *
 * fromPairs([['foo', 'bar'], ['baz', 42]]); // {foo: 'bar', baz: 42}
 *
 */
const fromPairs: FromPairs = function <P extends string | number | symbol, V>(array: any[][]) {
  // @ts-ignore
  const result: Record<P, V> = {};

  if (!isArray(array)) {
    return result;
  }

  array.forEach((item) => {
    result[item[0] as P] = item[1];
  });

  return result;
};

export default fromPairs;
