import getTag from './internals/getTag';
import { functionProtoToString, objectProtoHasOwnProperty, objectGetPrototypeOf, objectTag } from './internals/native';
import isObjectLike from './isObjectLike';

const objectCtorString = functionProtoToString.call(Object);

/**
 * 检查值是否为普通对象，即由 `Object` 构造函数创建或 `[[Prototype]]` 为 `null` 的对象。
 *
 * @alias module:Language.isPlainObject
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为普通对象，返回 `true`，否则返回 `false`。
 * @example
 *
 * function Foo(){
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo); // false
 *
 * isPlainObject([1,2,3]); // false
 *
 * isPlainObject({ a: 1, b: 2 }); // true
 *
 * isPlainObject(Object.create(null)); // true
 *
 */
function isPlainObject(value: any): value is object {
  if (!isObjectLike(value) || getTag(value) !== objectTag) {
    return false;
  }
  const proto = objectGetPrototypeOf(Object(value));

  // Object.create(null)
  if (proto === null) {
    return true;
  }

  const Ctor = objectProtoHasOwnProperty.call(proto, 'constructor') && proto.constructor;
  // 这里如果直接比较 proto.constructor === Object ，iframe 嵌套会导致结果不准确。
  return typeof Ctor === 'function' && Ctor instanceof Ctor && functionProtoToString.call(Ctor) === objectCtorString;
}

export default isPlainObject;
