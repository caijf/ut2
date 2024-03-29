import { stubFlase } from './internals/helpers';
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
 * @param {Object} object 来源对象。
 * @param {Function} [predicate] 调用每一个属性的函数。
 * @returns {Object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * omitBy(obj); // { name: "jeff", age: 18 }
 *
 * omitBy(obj, (value) => typeof value === 'number'); // { name: "jeff" }
 *
 * omitBy(obj, (value) => value); // {}
 *
 */
function omitBy<T extends object>(object: T, predicate: (value: any, key: any) => any = stubFlase) {
  return pickBy(object, negate(predicate));
}

export default omitBy;
