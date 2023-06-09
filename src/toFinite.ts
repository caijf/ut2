import toNumber from './toNumber';

const MAX_VALUE = 1.7976931348623157e308;

/**
 * 转换 `value` 为一个有限数字。
 *
 * @static
 * @alias module:Util.toFinite
 * @since 1.0.0
 * @param {*} value 要转换的值。
 * @returns {number} 转换后的数字。
 * @example
 *
 * toSafeInteger(3.2); // 3.2
 *
 * toSafeInteger('3.2'); // 3.2
 *
 * toSafeInteger(-0); // -0
 *
 * toSafeInteger('-0'); // -0
 *
 * toSafeInteger('0'); // 0
 *
 * toSafeInteger(NaN); // 0
 *
 * toSafeInteger(Infinity); // 1.7976931348623157e+308
 *
 * toSafeInteger(-Infinity); // -1.7976931348623157e+308
 *
 */
function toFinite(value: any) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === Infinity || value === -Infinity) {
    const sign = value < 0 ? -1 : 1;
    return sign * MAX_VALUE;
  }
  return value === value ? value : 0;
}

export default toFinite;
