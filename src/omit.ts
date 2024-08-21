import allKeysIn from './allKeysIn';
import castArray from './castArray';
import { Many, PropertyName, WithNullable } from './internals/types';

interface OmitFunction {
  <T extends object, K extends keyof T = never>(object: WithNullable<T>, fields?: Many<K>): Omit<T, K>;
  <T extends object, K extends PropertyName>(object: WithNullable<T>, fields?: Many<K>): Partial<T>;
  (object: any, fields?: Many<PropertyName>): Record<PropertyName, any>;
}

/**
 * 创建一个对象，该对象由忽略属性之外的 `object` 自身和继承的可枚举属性组成。与 [`pick`](#.pick) 相反。
 *
 * @static
 * @alias module:Object.omit
 * @since 1.0.0
 * @param {Object} object 来源对象。
 * @param {string | string[]} [fields] 要被忽略的属性。
 * @returns {Object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * // 浅拷贝对象
 * omit(obj); // { name: "jeff", age: 18 }
 *
 * // 排除单个属性
 * omit(obj, 'name'); // { age: 18 }
 *
 * // 排除多个属性
 * omit(obj, ['name', 'age']); // {}
 *
 */
const omit: OmitFunction = function <T extends object, K extends keyof T>(object: WithNullable<T>, fields: Many<K> = []) {
  const keys = allKeysIn(object) as K[];
  const fieldArr = castArray(fields);
  const result: Record<any, any> = {};

  keys.forEach((key) => {
    if (fieldArr.indexOf(key) === -1) {
      result[key] = object![key];
    }
  });

  return result;
};

export default omit;
