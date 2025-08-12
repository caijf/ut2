import eq from './eq';
import { objectProtoHasOwnProperty } from './internals/native';

/**
 * 浅比较两个值是否相等。常用于参数对象比较。
 *
 * 1. 如果两个值相等，返回 `true`。
 * 2. 如果两个对象属性数量相等，且遍历每个属性值都相等，则返回 `true`。
 * 3. 否则返回 `false`。
 *
 * @alias module:Util.shallowEqual
 * @since 1.21.0
 * @param {Array} objA 要比较的值。。
 * @param {Array} objB 另一个要比较的值。
 * @param {boolean} [strictCheck=true] 严格比较，如果为 `true` 表示区分 `0` 和 `-0`。默认 `true`。
 * @returns 浅比较两个值是否相等。
 * @example
 * shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 * shallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 }); // false
 *
 * shallowEqual([1, 2], [1, 2]); // true
 * shallowEqual([1, 2], [1, 3]); // false
 * shallowEqual([1, 2], [1, 2, 3]); // false
 *
 * // 两个相等值返回 true
 * shallowEqual(1, 1); // true
 * shallowEqual('foo', 'foo'); // true
 * shallowEqual(NaN, NaN); // true
 * shallowEqual(null, null); // true
 * shallowEqual(undefined, undefined); // true
 * const obj1 = {};
 * const obj2 = obj1;
 * shallowEqual(obj1, obj2); // true
 *
 * // 默认严格比较，区分 0 和 -0
 * shallowEqual([0, -0], [-0, 0]); // false
 *
 * // 非严格比较，不区分 0 和 -0
 * shallowEqual([0, -0], [-0, 0], false); // true
 */
function shallowEqual(objA: any, objB: any, strictCheck = true) {
  // 检查两个对象是否为同一个引用
  if (eq(objA, objB, strictCheck)) {
    return true;
  }

  // 检查是否为对象类型
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 检查属性数量是否相同
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 遍历属性，检查属性值是否相同
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!objectProtoHasOwnProperty.call(objB, key) || !eq(objA[key], objB[key], strictCheck)) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
