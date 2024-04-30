import getSymbols from './internals/getSymbols';
import { objectKeys } from './internals/native';
import isObject from './isObject';

/**
 * 创建一个数组，包含对象自身的可枚举属性（包含 `Symbol` 属性）。
 *
 * 同 `Object.keys` + `Object.getOwnPropertySymbols`。
 *
 * @static
 * @alias module:Object.allKeys
 * @since 1.1.0
 * @param {Object} object 要查询的对象。
 * @returns {Array<string|symbol>} 对象自身的可枚举属性(包含 `Symbol` 属性)。
 * @example
 *
 * function Foo(){
 *   this.a = 1;
 *   this[Symbol.for('b')] = 2;
 * }
 * Foo.prototype.c = 3;
 * Foo.prototype[Symbol.for('d')] = 4;
 *
 * allKeys(new Foo); // ['a', Symbol(b)]
 *
 */
function allKeys(object?: any) {
  if (!isObject(object)) {
    return [];
  }
  return (objectKeys(object) as (string | symbol)[]).concat(getSymbols(object));
}

export default allKeys;
