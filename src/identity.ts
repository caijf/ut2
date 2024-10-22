/**
 * 返回第一个参数。
 *
 * @alias module:Util.identity
 * @since 1.0.0
 * @param {*} value 任意值。
 * @returns 返回 `value`。
 * @example
 *
 * const obj = { a: 1, b: 2 };
 *
 * console.log(identity(obj) === obj); // true
 *
 */

function identity<T>(value?: T): T;
function identity<T>(value: T, ...args: any[]): T;
function identity<T>(value?: T) {
  return value;
}

export default identity;
