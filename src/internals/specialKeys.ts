import isPrototype from './isPrototype';
import { objectProtoHasOwnProperty, objectKeys } from './native';

/**
 * 获取对象的键，忽略 `constructor` 。
 *
 * @private
 * @param value 对象
 * @returns 可枚举的键
 */
function keys(value: object) {
  if (!isPrototype(value)) {
    return objectKeys(value);
  }
  const result = [];
  for (const key in Object(value)) {
    if (objectProtoHasOwnProperty.call(value, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  return result;
}

export default keys;
