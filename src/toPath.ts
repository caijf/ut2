import stringToPath from './internals/stringToPath';
import isArray from './isArray';
import isSymbol from './isSymbol';
import toString from './toString';

/**
 * 将值转为对象的键。
 *
 * @private
 * @param {*} value 转为对象键的值
 * @returns {symbol | string}
 */
function toKey(value: any) {
  return isSymbol(value) ? value : toString(value);
}

/**
 * 将值转为属性路径数组。
 *
 * @alias module:Util.toPath
 * @since 1.16.0
 * @param {*} value 要转换的值。
 * @returns {Array} 一个新的属性路径数组。
 * @example
 * toPath('a.b.c'); // ['a', 'b', 'c']
 *
 * toPath('a[0].b.c'); // ['a', '0', 'b', 'c']
 *
 * toPath(['a', 'b', 'c']); // ['a', 'b', 'c']
 */
function toPath(value: any) {
  if (isArray(value)) {
    return value.map(toKey);
  }
  return isSymbol(value) ? [value] : stringToPath(toString(value));
}

export default toPath;
