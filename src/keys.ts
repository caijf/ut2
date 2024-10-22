import { objectKeys } from './internals/native';
import isObject from './isObject';

/**
 * 创建一个数组，包含对象自身的可枚举属性（不包含 `Symbol` 属性）。
 *
 * 同 `Object.keys`。
 *
 * @alias module:Object.keys
 * @since 1.7.0
 * @param {Object} object 要查询的对象。
 * @returns {string[]} 对象自身的可枚举属性(不包含 `Symbol` 属性)。
 * @example
 *
 * function Foo(){
 *   this.a = 1;
 *   this[Symbol.for('b')] = 2;
 * }
 * Foo.prototype.c = 3;
 * Foo.prototype[Symbol.for('d')] = 4;
 *
 * keys(new Foo); // ['a']
 *
 */
function keys(object?: any) {
  if (!isObject(object)) {
    return [];
  }
  return objectKeys(object);
}

export default keys;
