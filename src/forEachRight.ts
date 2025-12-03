import createForEach from './internals/createForEach';

/**
 * 迭代集合元素（从右往左的顺序），为每个元素调用 `iteratee`。
 *
 * `iteratee` 函数可以通过显式返回 `false` 来提前退出迭代。
 *
 * `iteratee` 调用时会传入三个参数 `value` `index|key` `collection`。
 *
 * @function
 * @alias module:Collection.forEachRight
 * @since 1.7.0
 * @requires module:Object.allKeys
 * @param {ArrayLike<any> | Object} collection 要迭代的集合。
 * @param {Function} [iteratee=identity] 每次迭代调用的函数。默认 `identity`。
 * @returns {ArrayLike<any> | Object} 迭代集合本身。
 * @example
 *
 * forEachRight([1,2,3], function(item){
 *   console.log(item);
 * });
 * // 3
 * // 2
 * // 1
 *
 * forEachRight({a: 1, b: 2}, function(value, key){
 *   console.log(value, key);
 * });
 * // 2 'b'
 * // 1 'a'
 *
 */
const forEachRight = createForEach(-1);

export default forEachRight;
