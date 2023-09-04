import { objectToString, symbolTag } from './internals/native';

/**
 * 检查值是否为 `Symbol` 类型或对象。
 *
 * @static
 * @alias module:Language.isSymbol
 * @since 1.0.0
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果值为 `Symbol` 类型或对象，返回 `true` ，否则返回 `false` 。
 * @example
 *
 * isSymbol(Symbol()); // true
 *
 * isSymbol(Symbol.iterator); // true
 *
 * isSymbol("abc"); // false
 *
 */
function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol' || objectToString.call(value) === symbolTag;
}

export default isSymbol;
