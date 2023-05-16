/**
 * 检查值是否为有效的类数组长度。
 *
 * @static
 * @alias module:Type.isLength
 * @since 1.0.0
 * @see {@link https://262.ecma-international.org/7.0/#sec-tolength|ToLength}
 * @param {*} value 要检查的值
 * @returns {boolean} 是否为有效的类数组长度
 * @example
 *
 * isLength(3); // true
 * isLength('3'); // false
 * isLength(Number.Min_VALUE); // false
 * isLength(Number.Infinity); // false
 *
 */
function isLength(value: any) {
  return (
    typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
  );
}

export default isLength;
