import { objectProto } from './native';

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

export default isPrototype;
