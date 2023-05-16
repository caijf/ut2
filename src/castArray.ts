/**
 * 如果值不是数组，则将其转换为数组。
 *
 * @static
 * @alias module:Util.castArray
 * @since 1.0.0
 * @param {*} [value] 要检查的值
 * @returns {Array} 转换数组
 * @example
 *
 * castArray('a'); // ["a"]
 *
 * castArray(1); // [1]
 *
 * castArray({ a: 1, b: 2}); // [{ a: 1, b: 2}]
 *
 * castArray(); // []
 *
 * castArray(undefined); // [undefined]
 *
 * castArray(null); // [null]
 *
 * const arr = [1, 2, 3];
 * castArray(arr); // [1, 2, 3]
 * console.log(arr === castArray(arr)); // true
 */
function castArray(value?: any) {
  if (!arguments.length) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export default castArray;
