import getTag from './internals/getTag';
import { mapTag, setTag } from './internals/native';
import isArrayLike from './isArrayLike';
import isNil from './isNil';
import isObjectLike from './isObjectLike';
import allKeys from './allKeys';

/**
 * 检查值是否为空对象。
 *
 * 类数组的 `length===0`，`Map` `Set` 的 `size === 0` 表示为空。如果对象 `Object.keys` 没有可枚举属性，则被认为是空的。
 *
 * 非上述类型值，都将被认为是空的。
 *
 * @alias module:Language.isEmpty
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为空，返回 `true`，否则返回 `false`。
 * @example
 *
 * isEmpty(null); // true
 *
 * isEmpty(true); // true
 *
 * isEmpty(1); // true
 *
 * isEmpty([]); // true
 *
 * isEmpty({}); // true
 *
 * isEmpty(''); // false
 *
 * isEmpty('abc'); // false
 *
 * isEmpty([1, 2, 3]); // false
 *
 * isEmpty({ a: 1, b: 2 }); // false
 *
 */
function isEmpty(value: any) {
  if (isNil(value)) {
    return true;
  }

  const tag = getTag(value);
  if (tag === mapTag || tag === setTag) {
    return !value.size;
  }

  if (isObjectLike(value)) {
    return !allKeys(value).length;
  }

  if (isArrayLike(value)) {
    return !value.length;
  }

  return true;
}

export default isEmpty;
