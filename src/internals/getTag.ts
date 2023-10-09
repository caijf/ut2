/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { objectProtoHasOwnProperty, objectProtoToString, symbolToStringTag } from './native';

/**
 * 获取值的 `Object.prototype.toString` ，并且忽略 `Symbol.toStringTag` 影响。
 *
 * @private
 * @param value 要查询的值
 * @returns 对象名称
 */
function getRawTag(value: any) {
  const isOwn = objectProtoHasOwnProperty.call(value, symbolToStringTag!);
  const tag = value[symbolToStringTag!];
  let unmasked = false;

  try {
    value[symbolToStringTag!] = undefined;
    unmasked = true;
  } catch (e) {
    /* empty */
  }

  const result = objectProtoToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symbolToStringTag!] = tag;
    } else {
      delete value[symbolToStringTag!];
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
  return symbolToStringTag && symbolToStringTag in Object(value) ? getRawTag(value) : objectProtoToString.call(value);
}

export default getTag;
