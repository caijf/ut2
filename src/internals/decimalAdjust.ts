/**
 * 将数字转为字符串。主要处理 `-0` 的值。
 *
 * @private
 * @param num 要转字符串的数字。
 * @returns 数字字符串。
 */
function numberToString(num: number) {
  const result = '' + num;
  return result === '0' && 1 / num === -Infinity ? '-0' : result;
}

/**
 * 数字调整。
 *
 * @private
 * @param {'floor'|'ceil'|'round'}  type  调整的类型。
 * @param {number}  value 要调整的数字。
 * @param {number} precision  指数（调整基数的10个对数）。
 * @returns {number} 调整后的数字。
 */
function decimalAdjust(type: 'floor' | 'ceil' | 'round', value: number, precision = 0) {
  const func = Math[type];

  // 如果没有定义或为 0
  if (typeof precision === 'undefined' || +precision === 0) {
    return func(value);
  }

  value = +value;
  precision = +precision;

  // 如果值不是数字或者 precision 不是整数
  if (isNaN(value) || !(typeof precision === 'number' && precision % 1 === 0)) {
    return NaN;
  }

  // 移动
  let pair = numberToString(value).split('e');
  value = func(+(pair[0] + 'e' + (pair[1] ? +pair[1] + precision : precision)));

  // 向前移
  pair = numberToString(value).split('e');
  return +(pair[0] + 'e' + (pair[1] ? +pair[1] - precision : -precision));
}

export default decimalAdjust;
