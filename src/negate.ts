/**
 * 创建一个函数来否定断言函数结果。
 *
 * @static
 * @alias module.Function.negate
 * @since 1.0.0
 * @param {function} predicate 断言函数
 * @returns 否定函数
 * @example
 *
 * function isEven(num){
 *   return num % 2 === 0;
 * }
 *
 * const nums = [1,2,3,4,5];
 * nums.filter(isEvent); // [2, 4]
 *
 * const ne = negate(isEvent);
 * nums.filter(ne); // [1, 3, 5]
 *
 */
function negate<T extends (...args: any[]) => any>(this: any, predicate: T) {
  if (typeof predicate !== 'function') {
    throw new TypeError('Expected a function');
  }

  return (...args: Parameters<T>) => {
    return !predicate.apply(this, args);
  };
}

export default negate;
