import isFinite from '../isFinite';
import toInteger from '../toInteger';
import toNumber from '../toNumber';
import toString from '../toString';
import { mathMin } from './native';

/**
 * 数字调整。
 *
 * @private
 * @param {'floor' | 'ceil' | 'round'} type 调整的类型。
 * @param {number} value 要调整的数字。
 * @param {number} precision 指数（调整基数的10个对数）。
 * @returns {number} 调整后的数字。
 */
function decimalAdjust(type: 'floor' | 'ceil' | 'round', value: number, precision = 0) {
  const func = Math[type];

  value = toNumber(value);
  precision = mathMin(toInteger(precision), 292);

  if (precision === 0 || !isFinite(value)) {
    return func(value);
  }

  // 移动
  let pair = toString(value).split('e');
  value = func(+(pair[0] + 'e' + (pair[1] ? +pair[1] + precision : precision)));

  // 向前移
  pair = toString(value).split('e');
  return +(pair[0] + 'e' + (pair[1] ? +pair[1] - precision : -precision));
}

export default decimalAdjust;
