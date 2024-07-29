/**
 * 将数组 `from` 位置的元素移至 `to` 位置，返回处理后的新数组。
 *
 * @static
 * @alias module:Array.move
 * @since 1.10.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice splice}
 * @param {Array} array 要处理的数组。
 * @param {number} from 要移动的元素索引。
 * @param {number} to 要移动目标位置的元素索引。
 * @returns {*} 处理后的新数组。
 * @example
 *
 * const arr = ['a', 'b', 'c', 'd'];
 *
 * move(arr, 0, 1); // ['b', 'a', 'c', 'd']
 *
 * move(arr, -2, 0); // ['c', 'a', 'b', 'd']
 *
 */
function move<T>(array: T[], from: number, to: number) {
  const copyArray = array.slice();
  copyArray.splice(to, 0, copyArray.splice(from, 1)[0]);
  return copyArray;
}

export default move;
