import eq from './eq';
import isArrayLike from './isArrayLike';

/**
 * 比较两个类数组的值是否相等。常用于参数对象比较。
 *
 * 1. 如果两个值相等，返回 `true`。
 * 2. 如果两个类数组 `length` 相等，且遍历每个值都相等，则返回 `true`。
 * 3. 否则返回 `false`。
 *
 * @alias module:Util.equalArrayLike
 * @since 1.18.0
 * @param {Array} arg1 类数组1。
 * @param {Array} arg2 类数组2。
 * @param {boolean} [strictCheck=true] 严格比较，如果为 `true` 表示区分 `0` 和 `-0`。默认 `true`。
 * @returns 是否相等。
 * @example
 * equalArrayLike([1, 2], [1, 2]); // true
 * equalArrayLike([1, 2], [1, 3]); // false
 * equalArrayLike([1, 2], [1, 2, 3]); // false
 *
 * // 松散比较
 * equalArrayLike(['a', 'b'], 'ab'); // true
 * equalArrayLike(['a', 'b'], { 0: 'a', 1: 'b', length: 2 }); // true
 *
 * // 两个相等值返回 true
 * equalArrayLike(NaN, NaN); // true
 * equalArrayLike(null, null); // true
 * equalArrayLike(undefined, undefined); // true
 * const obj1 = {};
 * const obj2 = obj1;
 * equalArrayLike(obj1, obj2); // true
 *
 * // 0 和 -0 严格比较返回 false
 * equalArrayLike([0, -0], [-0, 0]); // false
 * // 非严格比较返回 true
 * equalArrayLike([0, -0], [-0, 0], false); // true
 */
function equalArrayLike(arg1: ArrayLike<any>, arg2: ArrayLike<any>, strictCheck = true): boolean {
  if (eq(arg1, arg2, strictCheck)) return true;
  if (!isArrayLike(arg1) || !isArrayLike(arg2)) return false;
  if (arg1.length !== arg2.length) return false;
  for (let i = 0; i < arg1.length; i++) {
    if (!eq(arg1[i], arg2[i], strictCheck)) return false;
  }
  return true;
}

export default equalArrayLike;
