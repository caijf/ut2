import isType from './internals/isType';
import isObjectLike from './isObjectLike';

/**
 * 检查值是否为 `Symbol` 对象。
 *
 * @static
 * @alias module:Type.isSymbol
 * @since 1.0.0
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为 `Symbol` 对象
 * @example
 *
 * isSymbol(Symbol()); // true
 *
 * isSymbol(Symbol.iterator); // true
 *
 * isSymbol("abc"); // false
 *
 */
function isSymbol(value: any) {
  return typeof value === 'symbol' || (isObjectLike(value) && isType(value, 'Symbol'));
}

export default isSymbol;
