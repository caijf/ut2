import toString from './toString';
import upperFirst from './upperFirst';

/**
 * 转换字符串首字母大写，剩下为小写。
 *
 * @alias module:String.capitalize
 * @since 1.0.0
 * @param {string} string 要转换的字符串。
 * @returns {string} 首字母大写的字符串。
 * @example
 *
 * capitalize('bar'); // 'Bar'
 *
 * capitalize('BAR'); // 'Bar'
 *
 */
function capitalize(string: string) {
  return upperFirst(toString(string).toLowerCase());
}

export default capitalize;
