import castArray from './castArray';

/**
 * 创建一个由选取的对象属性组成的对象。
 *
 * 允许选取不可枚举的属性。
 *
 * @static
 * @alias module:Object.pick
 * @since 1.0.0
 * @param {object} obj 对象
 * @param {string|string[]} [fields] 选取的属性
 * @returns {object} 新对象
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
// function pick<T extends object, K extends keyof T>(obj: T, fields: K | K[]): Pick<T, K>;
// function pick<T extends object>(obj: T, fields?: string | string[]): Partial<T>;
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
