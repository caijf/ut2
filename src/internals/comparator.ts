function createOperation(comparator: (value: any, other: any) => boolean) {
  return function (value: any, other: any) {
    if (!(typeof value === 'string' && typeof other === 'string')) {
      value = +value;
      other = +other;
    }
    return comparator(value, other);
  };
}

function baseGt(value: any, other: any) {
  return value > other;
}

function baseLt(value: any, other: any) {
  return value < other;
}

/**
 * 检查 `value` 是否大于 `other` 。
 *
 * @private
 * @param value 要比较的值。
 * @param other 另一个要比较的值。
 * @returns 如果 `value` 大于 `other` 返回 `true` ，否则返回 `false` 。
 */
export const gt = createOperation(baseGt);

/**
 * 检查 `value` 是否小于 `other` 。
 *
 * @private
 * @param value 要比较的值。
 * @param other 另一个要比较的值。
 * @returns 如果 `value` 小于 `other` 返回 `true` ，否则返回 `false` 。
 */
export const lt = createOperation(baseLt);
