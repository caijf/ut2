import negate from './negate';
import pickBy from './pickBy';

/**
 * 创建一个对象，该对象忽略 `predicate` （断言函数）判断不是真值的属性后，`object` 自身和继承的可枚举属性组成。与 [`pickBy`](#.pickBy) 相反。
 *
 * `predicate` 调用时会传入 2 个参数 `value` `key` 。
 *
 * @static
 * @alias module:Object.omitBy
 * @since 1.0.0
 * @param {object} obj 来源对象。
 * @param {function} predicate 调用每一个属性的函数。
 * @returns {object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * omitBy(obj); // {}
 *
 * omitBy(obj, (value, key) => typeof value === 'number'); // { name: "jeff" }
 *
 * omitBy(obj, (value, key) => value); // {}
 *
 */
function omitBy<T extends object>(obj: T, predicate: (value: any, key: any) => any = () => true) {
  return pickBy(obj, negate(predicate));
}

export default omitBy;
