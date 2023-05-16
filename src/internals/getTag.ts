import { hasOwnProperty, objectToString } from './native';

/**
 * 获取值的 `Object.prototype.toString` ，并且忽略 `Symbol.toStringTag` 影响。
 *
 * @param value 要查询的值
 * @returns 对象名称
 */
function getRawTag(value: any) {
  const isOwn = hasOwnProperty.call(value, Symbol.toStringTag);
  const tag = value[Symbol.toStringTag];
  let unmasked = false;

  try {
    value[Symbol.toStringTag] = undefined;
    unmasked = true;
  } catch (e) {
    /* empty */
  }

  const result = objectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[Symbol.toStringTag] = tag;
    } else {
      delete value[Symbol.toStringTag];
    }
  }
  return result;
}

/**
 * 获取值的 `Object.prototype.toString` ，忽略 `Symbol.toStringTag` 影响。
 *
 * @param value 要查询的值
 * @returns 对象名称
 */
function getTag(value: any) {
  return Symbol && Symbol.toStringTag && Symbol.toStringTag in Object(value)
    ? getRawTag(value)
    : objectToString.call(value);
}

export default getTag;
