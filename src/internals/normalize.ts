/**
 * 规整化数字。如果值不能转为数字，返回默认值。
 *
 * @private
 * @param {*} num 要规整化的值。
 * @param {number} [defaultValue=0] 如果不能转为数字，返回该默认值。
 * @returns {number} 数字。
 */
export function normalizeNumber(num: any, defaultValue = 0) {
  num = +num;
  num = num === num ? num : defaultValue;
  return num;
}
