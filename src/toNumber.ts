import isObject from './isObject';
import isSymbol from './isSymbol';

const reIsBinary = /^0b[01]+$/i;

const reIsOctal = /^0o[0-7]+$/i;

// Number('-0x1a2b3c') // NaN
// parseInt('-0x1a2b3c') // -1715004
// 统一处理为 NaN
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/**
 * 转换 `value` 为数字。
 *
 * @static
 * @alias module:Util.toNumber
 * @since 1.0.0
 * @param {*} value 要处理的值。
 * @returns {number} 转换后的数字。
 * @example
 *
 * toNumber(3.2); // 3.2
 *
 * toNumber('3.2'); // 3.2
 *
 * toNumber(-0); // -0
 *
 * toNumber('-0'); // -0
 *
 * toNumber('0'); // 0
 *
 * toNumber(NaN); // NaN
 *
 * toNumber(Infinity); // Infinity
 *
 * toNumber(-Infinity); // -Infinity
 *
 */
function toNumber(value: any) {
  if (typeof value === 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NaN;
  }
  if (isObject(value)) {
    value = Number(value);
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value;
  }
  value = value.trim();
  const isBinary = reIsBinary.test(value);

  return isBinary || reIsOctal.test(value)
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(value)
    ? NaN
    : +value;
}

export default toNumber;
