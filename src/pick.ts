import castArray from './castArray';

/**
 * 创建一个从 `object` 选中的属性的对象。
 *
 * 允许选取对象的所有属性（包含不可枚举属性）。
 *
 * @static
 * @alias module:Object.pick
 * @since 1.0.0
 * @param {object} obj 来源对象。
 * @param {string|string[]} [fields] 选中的属性。
 * @returns {object} 新对象。
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
function pick<T extends object, K extends keyof T>(obj: T, fields: K | K[] = []) {
  const result: Record<any, any> = {};
  const fieldArr = castArray(fields);

  for (let i = 0; i < fieldArr.length; i++) {
    const field = fieldArr[i];
    if (field in obj) {
      result[field] = obj[field];
    }
  }

  return result as Pick<T, K>;
}

export default pick;
