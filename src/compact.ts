import isArray from './isArray';

/**
 * 创建一个新数组，包含原数组中所有的非假值元素。
 *
 * 例如 `false` `null` `0` `""` `undefined` `NaN` 都被认为是假值。
 *
 * @static
 * @alias module:Array.compact
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy Falsy}
 * @param {Array} array 待处理的数组。
 * @returns {Array} 过滤掉假值的新数组。
 * @example
 *
 * compact([0, 1, false, '', 2]); // [1, 2]
 *
 */
function compact<T>(array: T[]) {
  return isArray(array) ? array.filter((item) => !!item) : [];
}

export default compact;
