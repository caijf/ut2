import getKeysIn from './internals/getKeysIn';
import getSymbolsIn from './internals/getSymbolsIn';
import isObject from './isObject';

/**
 * 创建一个数组，包含对象自身及继承的可枚举属性（包含 `Symbol` 属性）。
 *
 * 同 `key...in` + 递归原型 `Object.getOwnPropertySymbols`。
 *
 * 注意：`Symbol` 键属性在字符串属性后面。
 *
 * @static
 * @alias module:Object.allKeysIn
 * @since 1.1.0
 * @param {Object} object 要查询的对象。
 * @returns {Array<string|symbol>} 对象自身及继承的可枚举属性(包含 `Symbol` 属性)。
 * @example
 *
 * function Foo(){
 *   this.a = 1;
 *   this[Symbol.for('b')] = 2;
 * }
 * Foo.prototype.c = 3;
 * Foo.prototype[Symbol.for('d')] = 4;
 *
 * allKeysIn(new Foo); // ['a', 'c', Symbol(b), Symbol(d)]
 *
 */
function allKeysIn(object?: any) {
  if (!isObject(object)) {
    return [];
  }
  return (getKeysIn(object) as (string | symbol)[]).concat(getSymbolsIn(object));
}

export default allKeysIn;
