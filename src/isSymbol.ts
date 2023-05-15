import isType from './internals/isType';

/**
 * 检查值是否为 Symbol 。
 *
 * @static
 * @alias module:Type.isSymbol
 * @since 1.0.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为 Symbol
 * @example
 *
 * isSymbol(Symbol.iterator); // true
 * isSymbol("abc"); // false
 *
 */
function isSymbol(value: any) {
  return isType(value, 'Symbol');
}

export default isSymbol;
