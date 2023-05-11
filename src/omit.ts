/**
 * 浅拷贝对象并排除部分属性
 *
 * @static
 * @alias module:Object.omit
 * @since 1.0.0
 * @param {object} obj 对象
 * @param {string|string[]} [fields] 排除的属性
 * @returns {object} 浅拷贝对象
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
 */
function omit<T extends object, K extends keyof T>(obj: T, fields: K | K[] = []) {
  const shallowCopy = { ...obj };
  const fieldArr = Array.isArray(fields) ? fields : [fields];

  for (let i = 0; i < fieldArr.length; i++) {
    const field = fieldArr[i];
    delete shallowCopy[field];
  }

  return shallowCopy as Omit<T, K>;
}

export default omit;
