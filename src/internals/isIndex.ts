import isLength from '../isLength';
import toNumber from '../toNumber';

/**
 * 检查值是否为有效的数组索引值。
 *
 * @private
 * @param value 要检查的值。
 * @returns {boolean} 值是否为有效的数组索引值。
 * @example
 * isIndex(0); // true
 * isIndex('0'); // true
 * isIndex('42'); // true
 *
 * isIndex('a'); // false
 * isIndex(0.1); // false
 * isIndex(Infinity); // false
 */
function isIndex(value: any) {
  const type = typeof value;
  if (type === 'string' && value) {
    value = toNumber(value);
  }
  return isLength(value);
}

export default isIndex;
