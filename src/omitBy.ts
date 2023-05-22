import negate from './negate';
import pickBy from './pickBy';

/**
 * 创建一个对象，该对象的属性由第二个参数断言方法返回 `Falsy` 。与 `pickBy` 相反。
 *
 * 断言方法的两个参数是对象的每个可枚举属性的 `value` `key` 。
 *
 * @static
 * @alias module:Object.omitBy
 * @since 1.0.0
 * @param {object} obj 对象
 * @param {function} predicate 每个属性/值调用函数
 * @returns {object} 新对象
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
