import createReduce from './internals/createReduce';

/**
 * 对每个元素（从右往左的顺序）调用 `iteratee` 函数，每一次运行 `iteratee` 会将元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
 *
 * 如果没有提供第三个参数值，则集合中的第一个元素将用作初始值。
 *
 * `iteratee` 调用时会传入四个参数 `accumulator`、`value`、`index|key`、`collection` 。
 *
 * @function
 * @alias module:Collection.reduceRight
 * @since 1.7.0
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {Function} [iteratee=identity] 每次迭代调用的函数。
 * @param {*} [initialValue] 初始值。
 * @returns {*} 累计值。
 * @example
 *
 * reduceRight([1,2,3], function(accumulator, current, index){
 *   return accumulator + current;
 * }, 0);
 * // 6
 *
 * reduceRight({a: 1, b: 2, c: 3}, function(accumulator, current, key){
 *   return accumulator + current;
 * }, 0);
 * // 6
 *
 */
const reduceRight = createReduce(-1);

export default reduceRight;
