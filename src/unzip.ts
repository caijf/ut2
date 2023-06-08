import isArray from './isArray';
import isArrayLikeObject from './isArrayLikeObject';

/**
 * 与 [`zip`](#.zip) 类似，除了它接受分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（返回数组的第一个元素包含所有的输入数组的第一元素，第二个元素包含了所有的输入数组的第二元素，依此类推。）。
 *
 * @static
 * @alias module:Array.unzip
 * @since 1.0.0
 * @param {Array} array 要处理的分组元素数组。
 * @returns {Array} 重组元素的新数组。
 * @example
 *
 * unzip([['barney', 'fred'], [36, 40]]); // [['barney', 36], ['fred', 40]]
 *
 * unzip([['barney', 36], ['fred', 40]]); // [['barney', 'fred'], [36, 40]]
 *
 */
function unzip(array: any[][]) {
  if (!isArray(array) || array.length === 0) {
    return [];
  }
  let length = 0;
  array = array.filter((group) => {
    if (isArrayLikeObject(group)) {
      length = Math.max(group.length, length);
      return true;
    }
    return false;
  });
  const result = Array(length);
  let index = -1;
  while (++index < length) {
    const item = array.map((group) => group[index]);
    result[index] = item;
  }
  return result;
}

export default unzip;
