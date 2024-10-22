import unzip from './unzip';

/**
 * 创建一个数组，数组的第一个元素包含所有给定数组的第一元素，第二个元素包含了所有给定数组的第二元素，依此类推。
 *
 * @alias module:Array.zip
 * @since 1.0.0
 * @param {...Array} array 要处理的分组元素数组。
 * @returns {Array} 重组元素的新数组。
 * @example
 *
 * zip(['barney', 'fred'], [36, 40]); // [['barney', 36], ['fred', 40]]
 *
 */
function zip(...arrays: any[][]) {
  return unzip(arrays);
}

export default zip;
