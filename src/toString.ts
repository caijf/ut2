import { symbolProto } from './internals/native';
import isArray from './isArray';
import isSymbol from './isSymbol';

const symbolToString = symbolProto ? symbolProto.toString : undefined;

function baseToString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }
  if (isArray(value)) {
    return `${value.map(baseToString)}`;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  const result = '' + value;
  return result == '0' && 1 / value === -Infinity ? '-0' : result;
}

/**
 * 转换 `value` 为字符串。`null` 和 `undefined` 将返回空字符串。`-0` 将被转换为 `"-0"` 。
 *
 * @static
 * @alias module:Util.toString
 * @since 1.0.0
 * @param {*} value 要处理的值。
 * @returns {string} 转换后的字符串。
 * @example
 *
 * toString(null); // ''
 *
 * toString(-0); // '-0'
 *
 * // 数组中的 `null` `undefined` 返回 'null' 'undefined'
 * toString([undefined, null]); // 'undefined,null'
 *
 * toString('a'); // 'a'
 *
 * toString(3); // '3'
 *
 */
function toString(value: any) {
  return value == null ? '' : baseToString(value);
}

export default toString;
