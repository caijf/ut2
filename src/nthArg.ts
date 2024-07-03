import nth from './nth';

/**
 * 创建一个函数，该函数返回第 `n` 个参数。如果 `n` 为负数，则返回从结尾开始的第 `n` 个参数。
 *
 * @static
 * @alias module:Util.nthArg
 * @since 1.0.0
 * @param {number} [n=0] 要返回参数的索引值。默认 `0`。
 * @returns 新函数。
 * @example
 *
 * const func1 = nthArg(1);
 *
 * func1('a', 'b', 'c', 'd'); // 'b'
 *
 * const func2 = nthArg(-2);
 *
 * func2('a', 'b', 'c', 'd'); // 'c'
 *
 */
function nthArg(n = 0) {
  return function (...args: any[]) {
    return nth(args, n);
  };
}

export default nthArg;
