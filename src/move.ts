/**
 * 将数组 `from` 位置的元素移至 `to` 位置，返回处理后的原数组。
 *
 * @alias module:Array.move
 * @since 1.10.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice | splice}
 * @param {Array} array 要处理的数组。
 * @param {number} from 要移动的元素索引。
 * @param {number} to 要移动目标位置的元素索引。
 * @returns {*} 处理后的原数组。
 * @example
 *
 * const arr = ['a', 'b', 'c', 'd'];
 *
 * move(arr, 0, 1); // ['b', 'a', 'c', 'd']
 *
 * // 此时 arr 已经变为 ['b', 'a', 'c', 'd']
 * move(arr, -2, 0); // ['c', 'b', 'a', 'd']
 *
 */
function move<T>(array: T[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
}

export default move;
