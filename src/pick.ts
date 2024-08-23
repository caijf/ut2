import castArray from './castArray';
import { Many, WithNullable } from './internals/types';
import isObject from './isObject';

/**
 * 创建一个从 `object` 选中的属性的对象。
 *
 * 允许选取对象的所有属性（包含不可枚举属性）。
 *
 * @static
 * @alias module:Object.pick
 * @since 1.0.0
 * @param {Object} object 来源对象。
 * @param {string | string[]} [fields] 选中的属性。
 * @returns {Object} 新对象。
 * @example
 *
 * const obj = { name: "jeff", age: 18 };
 *
 * pick(obj); // {}
 *
 * // 选取单个属性
 * pick(obj, 'name'); // { name: "jeff" }
 *
 * // 选取多个属性
 * pick(obj, ['name', 'age']); // { name: "jeff", age: 18 }
 */
function pick<T extends object, K extends keyof T = never>(object: WithNullable<T>, fields: Many<K> = []) {
  const result = {} as T;

  if (!isObject(object)) {
    return result;
  }

  const fieldArr = castArray(fields);

  fieldArr.forEach((field) => {
    if (field in object) {
      result[field] = object[field];
    }
  });

  return result as Pick<T, K>;
}

export default pick;
