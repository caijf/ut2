/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hasOwnProperty, objectToString, symToStringTag } from './native';

/**
 * 获取值的 `Object.prototype.toString` ，并且忽略 `Symbol.toStringTag` 影响。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function getRawTag(value: any) {
  const isOwn = hasOwnProperty.call(value, symToStringTag!);
  const tag = value[symToStringTag!];
  let unmasked = false;

  try {
    value[symToStringTag!] = undefined;
    unmasked = true;
  } catch (e) {
    /* empty */
  }

  const result = objectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag!] = tag;
    } else {
      delete value[symToStringTag!];
    }
  }
  return result;
}

/**
 * 获取值的 `Object.prototype.toString` ，忽略 `Symbol.toStringTag` 影响。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function getTag(value: any) {
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString.call(value);
}

export default getTag;
