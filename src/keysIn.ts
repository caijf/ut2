import getKeysIn from './internals/getKeysIn';
import isObject from './isObject';

/**
 * 创建一个数组，包含对象自身及继承的可枚举属性（不包含 `Symbol` 属性）。
 *
 * 同 `key...in` 。
 *
 * @static
 * @alias module:Object.keysIn
 * @since 1.1.0
 * @param {Object} object 要查询的对象。
 * @returns {string[]} 对象自身及继承的可枚举属性名(不包含 `Symbol` 属性)数组。
 * @example
 *
 * function Foo(){
 *   this.a = 1;
 *   this[Symbol.for('b')] = 2;
 * }
 * Foo.prototype.c = 3;
 * Foo.prototype[Symbol.for('d')] = 4;
 *
 * keysIn(new Foo); // ['a', 'c']
 *
 */
function keysIn<T extends object>(object: T) {
  if (!isObject(object)) {
    return [];
  }
  return getKeysIn(object);
}

export default keysIn;
