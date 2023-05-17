import { hasOwnProperty, objectProto } from './native';

/**
 * 检测值是否为原型对象。
 *
 * @private
 * @param value 要检查的值
 * @returns 是否为原型对象
 */
function isPrototype(value: any) {
  if (typeof value !== 'object') {
    return false;
  }
  const Ctor = value.constructor;
  const proto = typeof Ctor === 'function' ? Ctor.prototype : objectProto;
  return value === proto;
}

/**
 * 获取对象的键。
 *
 * 抹平浏览器和 `nodejs` 对于 `Foo.prototype.constructor` 是否可枚举的差异
 *
 * @param value 对象
 * @returns 可枚举的键
 */
function keys(value: object) {
  if (!isPrototype(value)) {
    return Object.keys(value);
  }
  const result = [];
  for (const key in Object(value)) {
    if (hasOwnProperty.call(value, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  return result;
}

export default keys;
