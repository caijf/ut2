import toNumber from './toNumber';

/**
 * 转换 `value` 为一个整数。
 *
 * 注意: 这个方法基于 [ToIntegerOrInfinity](https://tc39.es/ecma262/#sec-tointegerorinfinity) ，区别在于 `-0` 会返回 `-0`。
 *
 * @alias module:Util.toInteger
 * @since 1.0.0
 * @param {*} value 要转换的值。
 * @returns {number} 转换后的整数。
 * @example
 *
 * toInteger(3.2); // 3
 *
 * toInteger('3.2'); // 3
 *
 * toInteger(-0); // -0
 *
 * toInteger('-0'); // -0
 *
 * toInteger('0'); // 0
 *
 * toInteger(NaN); // 0
 *
 * toInteger(Infinity); // Infinity
 *
 * toInteger(-Infinity); // -Infinity
 *
 */
function toInteger(value: any) {
  const result = toNumber(value);

  // NaN -0 +0 0 Infinity -Infinity
  if (!result || result === Infinity || result === -Infinity) {
    return result === result ? result : 0;
  }
  const remainder = result % 1;
  return remainder ? result - remainder : result;
}

export default toInteger;
